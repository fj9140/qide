import { createHmac } from 'crypto';
import { got } from 'got';
import { APIError } from './api-error';

interface RestfulOptions {
  secType: 'NONE' | 'USER_DATA';
  method?: 'GET';
}

export function Restful(options: RestfulOptions) {
  return function (
    target: unknown,
    ppropertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const origMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const config = (this as any).config;
      const baseURL = 'https://api.binance.com';

      // 获取原方法返回的请求信息
      const requestInfo = origMethod.apply(this, args);
      const { url, params = {}, data = {} } = requestInfo;

      let headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // 根据安全类行添加认证
      if (options.secType === 'USER_DATA') {
        if (!config.apiKey || !config.apiSecret) {
          throw new Error('API Key and Secret are required for this operation');
        }

        headers['X-MBX-APIKEY'] = config.apiKey;

        // 添加时间戳
        params.timestamp = Date.now();

        // 生成签名
        const query = new URLSearchParams(params).toString();
        const signature = createHmac('sha256', config.apiSecret)
          .update(query)
          .digest('hex');
        params.signature = signature;
      }

      // 构建完整的URL
      const query = new URLSearchParams(params).toString();
      const fullURL = `${baseURL}${url}?${query ? `?${query}` : ''}`;

      try {
        const response = await got(fullURL, {
          method: options.method || 'GET',
          headers,
          json: Object.keys(data).length > 0 ? data : undefined,
          responseType: 'json',
        });
        return response.body
      } catch (error: any) {
        throw new APIError(`${error.message}`);
      }
    };

    return descriptor;
  };
}
