declare namespace BinanceAPI{
  namespace DerivativeTrading{
     namespace UMFutures{
      namespace MarketData{
        namespace MarkPrice{
          interface MarkPriceInfo{
            symbol:string,
            markPrice:`${number}`,
            indexPrice:`${number}`,
            time:number
          }
          function getPremiumIndex():MarkPriceInfo[]
          function getPremiunIndex(symbol:string):MarkPriceInfo
        }
      }
     }
  }
}

export= BinanceAPI
