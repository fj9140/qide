import {
  PremiumIndexResponse,
  PremiumIndex,
  FundingInfoResp,
  TickerPriceResp,
  TickerPrice,
} from './interface';
import axios, { AxiosResponse } from 'axios';

export class FutureRestAPI {
  private _baseURL = 'https://fapi.binance.com/fapi';

  private axiosInstance :axios.AxiosInstance
  constructor(proxyConfig?:axios.AxiosProxyConfig) {
    if(proxyConfig){
      this.axiosInstance = axios.create({
        proxy:proxyConfig
      })
    }else{
      this.axiosInstance = axios.create();
    }
  }


  /**
   * 采集各大交易所数据加权平均
   * @param symbol 交易对
   * @returns
   */
  premiumIndex(
    symbol: string,
  ): Promise<
    AxiosResponse<Extract<PremiumIndexResponse, PremiumIndex>, any, {}>
  >;
  /**
   * 采集各大交易所数据加权平均
   */
  premiumIndex(): Promise<
    AxiosResponse<Extract<PremiumIndexResponse, PremiumIndex[]>, any, {}>
  >;

  premiumIndex(symbol?: string) {
    if (symbol) {
      return this._get<Extract<PremiumIndexResponse, PremiumIndex>>(
        `v1/premiumIndex?symbol=${symbol}`,
      );
    } else {
      return this._get<Extract<PremiumIndexResponse, PremiumIndex[]>>(
        `v1/premiumIndex`,
      );
    }
  }

  /**
   * 查询资金费率
   */
  fundingInfo() {
    return this._get<FundingInfoResp>('/v1/fundingInfo');
  }

  /**
   * 查询指定合约最新价格
   */
  tickerPrice(
    symbol: string,
  ): Promise<AxiosResponse<Extract<TickerPriceResp, TickerPrice>, any, {}>>;
  /**
   * 查询所有合约最新价格
   */
  tickerPrice(): Promise<
    AxiosResponse<Extract<TickerPriceResp, TickerPrice[]>, any, {}>
  >;
  tickerPrice(symbol?: string) {
    if (symbol) {
      return this._get<Extract<TickerPriceResp, TickerPrice>>(
        `v2/ticker/price?symbol=${symbol}`,
      );
    } else {
      return this._get<Extract<TickerPriceResp, TickerPrice[]>>(
        `v2/ticker/price`,
      );
    }
  }

  private _get<T>(uri: string) {
    // 对uri的第一位进行处理，确保它不以斜杠开头
    if (uri.startsWith('/')) {
      uri = uri.slice(1);
    }
    return this.axiosInstance.get<T>(`${this._baseURL}/${uri}`);
  }
}
