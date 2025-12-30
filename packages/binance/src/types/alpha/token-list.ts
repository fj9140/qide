export type AlphaAllTokenResponse={
  /**
   * Response code ,"000000" indicates success.
   */
  code:'000000',
  /**
   * Null, generally used for returning informational messages.
   */
  message:string|null,
  /**
   * Null, usually for more detailed messages or error descriptions.
   */
  messageDetail:string|null,
  data:{
    /**
     * ALPHA Token ID
     */
    alphaId:`ALPHA_${number}`,
    /**
     * Token symbol
     */
    symbol:string,
    /**
     * Token name
     */
    name:string,
    /**
     * Chain ID
     */
    chainId:string,
    /**
     * Contract address
     */
    contractAddress:string
    /**
     * Price in USDT
     */
    price:`$number`,
    /**
     * 流动性
     */
    liquidity:`$number`,
  }[]
}
