import {filter, Observable, of, Subject} from 'rxjs';
import {BaseAPI} from './base-api';
import {HttpParams} from '@angular/common/http';
import {
  ExchangeInfoResponse,
  PremiumIndexResponse,
  ContinuesKlinesRequest,
  ContinuesKlinesResponse,
} from 'money-printer-types/binance/api/fapi/RESTful';
import {
  ContinuesKlinesParams as WsContinuesKlinesParams,
  ContinuesKlinesResponse as WsContinuesKlineResponse,
  BaseResponse as WsBaseResponse,
  MiniTickerResponse as WsMiniTickerResponse,
  MiniTickerParams as WsMiniTickerParams,
  TickerParams as WsTickerParams,
  TickerResponse as WsTickerResponse,
} from 'money-printer-types/binance/api/fapi/websocket';
import * as pako from 'pako';

export class FAPI extends BaseAPI {
  private _ws: WebSocket | null = null;
  private _wsSubject = new Subject<WsBaseResponse>();

  connectStream() {
    const ws = (this._ws = new WebSocket('wss://fstream.yshyqxx.com/stream'));
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['btcusdt@ticker'],
          id: 1,
        }),
      );
    };
    ws.onmessage = event => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = pako.inflate(new Uint8Array(reader.result as ArrayBuffer), {to: 'string'}); // Use pako to ungzip
            this._wsSubject.next(JSON.parse(data).data);
          } catch (err) {
            // If decompression fails, assume the data is uncompressed text
            this._wsSubject.next(JSON.parse(reader.result as string).data);
          }
        };
        reader.readAsArrayBuffer(event.data);
      } else if (typeof event.data === 'string') {
        this._wsSubject.next(JSON.parse(event.data));
      } else {
        this._wsSubject.error(new Error('Unknown data type'));
      }
    };
    ws.onclose = () => {
      this._wsSubject.complete();
      this._ws = null;
    };
    ws.onerror = err => {
      this._wsSubject.error(err);
      this._ws = null;
    };
  }

  get(apiName: 'exchangeInfo'): Observable<ExchangeInfoResponse>;
  get(apiName: 'premiumIndex'): Observable<PremiumIndexResponse>;
  get(apiName: 'continuesKlines', params: ContinuesKlinesRequest): Observable<ContinuesKlinesResponse>;
  get(apiName: string, params?: unknown): Observable<unknown> {
    if (apiName === 'exchangeInfo') {
      return this.httpClient.get<ExchangeInfoResponse>('https://www.binance.com/fapi/v1/exchangeInfo?showall=true');
    } else if (apiName === 'premiumIndex') {
      return this.httpClient.get('https://www.binance.com/fapi/v1/premiumIndex');
    } else if (apiName === 'continuesKlines') {
      return this.httpClient.get<ContinuesKlinesResponse>('https://www.suitechsui.io/fapi/v1/continuousKlines', {
        params: new HttpParams().appendAll(params as ContinuesKlinesRequest),
      });
    } else {
      return of(null);
    }
  }

  stream(name: 'continuousKline', params: WsContinuesKlinesParams): Observable<WsContinuesKlineResponse>;
  stream(name: '24hrMiniTicker', params: WsMiniTickerParams): Observable<WsMiniTickerResponse>;
  stream(name: '24hrTicker', params: WsTickerParams): Observable<WsTickerResponse>;
  stream(name: string, params: unknown): Observable<unknown> {
    if (!this._ws) {
      this.connectStream();
    }

    if (name == 'continuousKline') {
      return this._wsSubject.pipe(
        filter(data => {
          if (data.data) {
            return data.data['e'] === 'continuous_kline';
          } else {
            return false;
          }
        }),
      ) as Observable<WsContinuesKlineResponse>;
    } else if (name === '24hrMiniTicker') {
      return this._wsSubject.pipe(
        filter(data => {
          if (data.data) {
            return data.data['e'] === '24hrMiniTicker';
          } else {
            return false;
          }
        }),
      ) as Observable<WsMiniTickerResponse>;
    } else if ((name = '24hrTicker')) {
      return this._wsSubject.pipe(
        filter(data => {
          if (data.data) {
            return data.data['e'] === '24hrTicker';
          } else {
            return false;
          }
        }),
      ) as Observable<WsTickerResponse>;
    } else {
      return of(null);
    }
  }
}
