export type PriceDiff={
    symbol: string;
    binanceMarkPrice: `${number}`;
    gateMarkPrice: `${number}`;
    priceDifferenceToBinance: number;
    priceDifferenceToGate: number;
    annualizedFeeDifference: number;
}
