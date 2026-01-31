import { describe, it, beforeAll, expect, vi } from 'vitest';
import { Account } from './account';
import { beforeEach } from 'node:test';
import got from 'got';

vi.mock('got', () => ({
  got: vi.fn(),
}));

describe('Account API Unit Tests', () => {
  let accountAPI: Account;
  beforeAll(() => {
    accountAPI = new Account({
      apiKey: '',
      apiSecret: '',
    });
  });

  describe('异常测试', () => {
    it('缺失API配置返回错误', () => {
      accountAPI.apiKey = '';
      accountAPI.apiSecret = '';
      expect(async () => {
        await accountAPI.getInfo();
      }).rejects.toThrow('API Key and Secret are required for this operation');
    });
  });

  it('得到正常账户信息', async () => {
    const { got } = await import('got');
    const accountAPI = new Account({
      apiKey: '',
      apiSecret: '',
    });
    accountAPI.apiKey = '123';
    accountAPI.apiSecret = '123';
    // 模拟成功响应（200）
    const mockResponse = {
      statusCode: 200,
      body: {
        makerCommision: 15,
      },
    };

    vi.mocked(got).mockResolvedValue(mockResponse);

    const info = await accountAPI.getInfo()
    console.log(info);
    expect((info as any).makerCommision).toBe(15);
    console.log(info);
  });
});
