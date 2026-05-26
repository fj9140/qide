import { beforeEach, describe, expect, it } from 'vitest';
import { FutureUtils } from './utils';
import { firstValueFrom } from 'rxjs';

describe('FutureUtils', () => {
  let futureUtils: FutureUtils;

  beforeEach(() => {
    futureUtils = new FutureUtils();
  });

  describe('getPriceAndFee', async () => {
    it('should return price and fee for all contracts', async () => {
      const data = await firstValueFrom(futureUtils.getPriceAndFee());
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
    },10000);

    it('should return price and fee for a specific contract', async () => {
      const symbol = 'BTCUSDT';
      const data = await firstValueFrom(futureUtils.getPriceAndFee(symbol));
      expect(data).toBeDefined();
      expect(data.symbol).toBe(symbol);
    },10000);

    it('should return null for fundingIntervalHours if not found', async () => {
      const symbol = 'BNXUSDT';
      const data = await firstValueFrom(futureUtils.getPriceAndFee(symbol));
      expect(data).toBeDefined();
      expect(data.symbol).toBe(symbol);
      expect(data.fundingIntervalHours).toBeNull();
    },10000);
  });
});
