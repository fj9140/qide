import { got } from 'got';

export async function testUrlSpeed(url: string): Promise<number>;
export async function testUrlSpeed(
  urls: string[],
): Promise<Record<string, number>>;
export async function testUrlSpeed(
  urls: string | string[],
): Promise<Record<string, number> | number> {
  const isArray = Array.isArray(urls);
  const list = isArray ? urls : [urls];
  const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const results: Record<string, number> = {};

  for (const url of list) {
    let total = 0;
    for (let i = 0; i < 5; i++) {
      const start = Date.now();
      try {
        await got(url, {
          method: 'GET',
          retry: { limit: 0 },
          throwHttpErrors: false,
        });
      } catch (err) {
        throw err;
      }
      total += Date.now() - start;
      if (i < 4) await sleep(1000);
    }
    results[url] = total / 5;
  }
  return isArray ? results : results[urls as string];
}
