export type WalletAssetResponse = {
  data: ({
    /**
     * Amount of the asset, represented as a string to maintain precision, e.g., "100.50".
     */
    amount: `${number}`;
    /**
     * Asset symbol, e.g., "USDT", "BTC", etc.
     */
    asset: string;
    /**
     * Full name of the asset, e.g., "Tether", "Bitcoin", etc.
     */
    assetName: string;
    /**
     * Valuation amount of the asset, represented as a string to maintain precision, e.g., "100.50".
     */
    valuationAmount: `${number}`;
  }&({
    /**
     * Type of the coin business, currently only "ALPHA" is supported. If the asset does not belong to any specific business type, this field may be omitted or set to an empty object.
     */
    coinBusinessType:'ALPHA',
    /**
     * ALPHA Token ID, formatted as "ALPHA_" followed by a number, e.g., "ALPHA_123". This field is present only for assets that are part of the ALPHA business type.
     */
    contractAddress:`0x${string}`,
  }|{
    /**
     * Type of the coin business, currently only "ALPHA" is supported. If the asset does not belong to any specific business type, this field may be omitted or set to an empty object.
     */
    coinBusinessType: null;
    /**
     * Contract address of the asset. This field is present only for assets that are part of a specific business type.
     */
    contractAddress: null;
  }))[];
};
