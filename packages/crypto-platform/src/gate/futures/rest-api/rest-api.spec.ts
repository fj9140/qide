import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FutureRestAPI } from './rest-api';

describe('FutureRestAPI', () => {
  let restApi: FutureRestAPI;

  beforeEach(() => {
    restApi = new FutureRestAPI();
  });

  describe('#getAllContracts', () => {
    it('should return all contracts successfully', async () => {
      const resp = await restApi.getAllContracts();
      expect(resp).toBeDefined();
    }, 10000);
  });
});
