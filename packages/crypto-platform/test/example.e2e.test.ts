import { describe, it, expect } from 'vitest';
import { FuturesWebsocket } from '../src/gate/futures/websocket/websocket';
import { TestScheduler } from 'rxjs/testing';
import { firstValueFrom } from 'rxjs';

// E2E
describe('连通测试 E2E', () => {
  it('ping 测试', async () => {
    const futureWS = new FuturesWebsocket('btc');
    expect(await firstValueFrom(futureWS.systemAPI.ping())).toEqual(
      expect.objectContaining({
        channel: 'futures.pong',
        time: expect.any(Number),
      }),
    );
  });
});
