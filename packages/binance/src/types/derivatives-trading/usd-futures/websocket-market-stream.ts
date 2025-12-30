type WebsocketMarketStream<A = string, T = unknown> = {
  StreamType: A;
  Response: T;
};

type BaseEvent = {
  /**
   * Event type
   */
  e: 'markPriceUpdate';
  /**
   * Event time
   */
  E: number;
  /**
   * Symbol
   */
  s: string;
};

export type MarkPriceForAllStream = WebsocketMarketStream<
  '!markPrice@arr' | 'markPrice@arr@1s',
  (BaseEvent & {
    /**
     * Mark price
     */
    p: `${number}`;
    /**
     * Index price
     */
    i: `${number}`;
    /**
     * Estimated settlment price, only useful in the last hour before the settlement starts
     */
    P: `${number}`;
    /**
     * Funding rate
     */
    r: `${number}`;
    /**
     * Next funding time
     */
    T: number;
  })[]
>;

export type AggTradeStream = WebsocketMarketStream<
  `${string}@aggTrade`,
  BaseEvent & {
    /**
     * Aggregate trade ID
     */
    a: number;
    /**
     * Price
     */
    p: `${number}`;
    /**
     * Quantity
     */
    q: `${number}`;
    /**
     * First trade ID
     */
    f: number;
    /**
     * Last trade ID
     */
    l: number;
    /**
     * Trade time
     */
    T: number;
    /**
     * Is the buyer the market maker?
     */
    m: boolean;
  }
>;

export type SubscribeMarketStreamData<
  T extends WebsocketMarketStream = WebsocketMarketStream
>={
  stream:T['StreamType'],
  data:T['Response']
}

export type SubscribeMarketStream<
  T extends WebsocketMarketStream = WebsocketMarketStream
> = {
  Request: {
    method: 'SUBSCRIBE';
    params: T['StreamType'][];
    id: number;
  };
  Response:
    | {
        result: null;
        id: number;
      }
    | {
        stream: T['StreamType'];
        data: T['Response'];
      };
};
