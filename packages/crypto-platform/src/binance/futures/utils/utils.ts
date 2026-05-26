import { from, map, Observable, zip } from 'rxjs';
import { FutureRestAPI } from '../rest-api/rest-api';
import { PremiumIndex } from '../rest-api/interface';
import axios from 'axios'

/**
 * 期货工具类
 */
export class FutureUtils {

  private _restAPI: FutureRestAPI

  constructor(proxyConfig?:axios.AxiosProxyConfig) {
    this._restAPI = new FutureRestAPI(proxyConfig);
  }

  /**
   * 获取所有合约的最新价格和资金费率
   */
  getPriceAndFee(): Observable<
    (PremiumIndex & { fundingIntervalHours: number | null })[]
  >;
  /**
   * 获取指定合约的最新价格和资金费率
   * @param symbol 交易对
   */
  getPriceAndFee(
    symbol: string,
  ): Observable<PremiumIndex & { fundingIntervalHours: number | null }>;
  getPriceAndFee(symbol?: string) {
    const premiumIndexPromise = symbol
      ? this._restAPI.premiumIndex(symbol)
      : this._restAPI.premiumIndex();
    const fundingInfoPromise = this._restAPI.fundingInfo();

    return zip(from(premiumIndexPromise), from(fundingInfoPromise)).pipe(
      map(([premiumIndexResponse, fundingInfoResponse]) => {
        const premiumIndexData = premiumIndexResponse.data;
        const fundingInfoData = fundingInfoResponse.data;

        if (Array.isArray(premiumIndexData)) {
          return premiumIndexData.map((item) => {
            const fundingInfo = fundingInfoData.find(
              (info) => info.symbol === item.symbol,
            );
            return {
              symbol: item.symbol,
              markPrice: item.markPrice,
              indexPrice: item.indexPrice,
              lastFundingRate: item.lastFundingRate,
              fundingIntervalHours: fundingInfo
                ? fundingInfo.fundingIntervalHours
                : null,
            };
          });
        } else {
          const fundingInfo = fundingInfoData.find(
            (info) => info.symbol === premiumIndexData.symbol,
          );
          return {
            symbol: premiumIndexData.symbol,
            markPrice: premiumIndexData.markPrice,
            indexPrice: premiumIndexData.indexPrice,
            lastFundingRate: premiumIndexData.lastFundingRate,
            fundingIntervalHours: fundingInfo
              ? fundingInfo.fundingIntervalHours
              : null,
          };
        }
      }),
    );
  }
}
