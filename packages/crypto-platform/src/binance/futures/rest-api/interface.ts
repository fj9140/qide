export type PremiumIndex = {
  symbol: string;
  markPrice: `${number}`;
  indexPrice: `${number}`;
  lastFundingRate: `${number}`;
};

export type PremiumIndexResponse = PremiumIndex[] | PremiumIndex;

export type FundingInfoResp = {
  /**
   * 交易对
   */
  symbol: string;
  /**
   * 资金费率间隔小时数
   */
  fundingIntervalHours: number;
}[];

export type TickerPrice = {
  /**
   * 交易对
   */
  symbol: string;
  /**
   * 最新价格
   */
  price: `${number}`;
  /**
   * 引擎撮合时间
   */
  time: number;
};
export type TickerPriceResp = TickerPrice[] | TickerPrice;
