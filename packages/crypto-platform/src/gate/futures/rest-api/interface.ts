export type GetAllContractsResponse = {
  /**
   * 合约标识
   */
  name:string,
  /**
   * 当前标记价格
   */
  mark_price:`${number}`
  /**
   * 当前指数价格
   */
  index_price:`${number}`
  /**
   * 最新成交价格
   */
  last_price:`${number}`

  /**
   * 当前资金费率
   */
  funding_rate:`${number}`
  /**
   * 资金费率更新时间间隔
   */
  funding_interval:BigInt
}[]
