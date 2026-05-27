import { FutureUtils as BinanceFutureUtils } from '../binance/futures/utils/utils';
import { FutureRestAPI as GateFutureRestAPI } from '../gate/futures/rest-api/rest-api';
import { zip, from, map } from 'rxjs';
import { calcAnnualizedFee } from '../utils/utils';
import { PriceDiff } from './interface';
import axios from 'axios';

export class PlatformUtils {
  private gateAPI: GateFutureRestAPI;
  private binanceFutureUtils: BinanceFutureUtils;

  constructor(proxyConfig?: axios.AxiosProxyConfig) {
    this.gateAPI = new GateFutureRestAPI(proxyConfig);
    this.binanceFutureUtils = new BinanceFutureUtils(proxyConfig);
  }

  getPriceDiff() {
    return zip(
      this.binanceFutureUtils.getPriceAndFee(),
      from(this.gateAPI.getAllContracts()),
    ).pipe(
      map(([binanceRes, gateRes]) => {
        const result = binanceRes
          .map((item) => {
            if (item.fundingIntervalHours === null) {
              return null;
            }
            const gateContract = gateRes.find(
              (contract) => contract.name.replace('_', '') === item.symbol,
            );
            if (!gateContract) {
              return null;
            }
            return {
              symbol: item.symbol,
              binanceMarkPrice: item.markPrice,
              gateMarkPrice: gateContract.mark_price,
              priceDifferenceToBinance:
                (Number(item.markPrice) / Number(gateContract.mark_price) - 1) *
                100,
              priceDifferenceToGate:
                (Number(gateContract.mark_price) / Number(item.markPrice) - 1) *
                100,
              annualizedFeeDifference:
                calcAnnualizedFee(
                  Number(item.lastFundingRate),
                  item.fundingIntervalHours,
                ) -
                calcAnnualizedFee(
                  Number(gateContract.funding_rate),
                  Number(gateContract.funding_interval) / 3600,
                ),
            };
          })
          .filter((item) => {
            if (item === null) {
              return false;
            }
            return (
              item.priceDifferenceToBinance * item.annualizedFeeDifference >
                0 &&
              (item.priceDifferenceToBinance >= 0.5 ||
                item.priceDifferenceToGate >= 0.5)
            );
          });
        return result as PriceDiff[];
      }),
    );
  }
}
