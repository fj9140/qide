import { Injectable } from '@angular/core';
import { binance } from 'money-printer-types/binance';
import { ContinuesKlinesResponse, ContinuesKlinesRequest } from 'money-printer-types/binance/api/fapi/RESTful';
import { Subject, of, Observable, map, catchError, filter, concatMap, take } from 'rxjs';
import * as pako from 'pako';
import {
  isContinuousContractKlineRequestParams,
  isOrderBookRequestParams,
  OrderBookRequestParams,
  OrderBookResponse,
} from 'money-printer-types';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FAPI, API, BAPI } from './';
import { QideConfigService } from '@qide/util';

@Injectable({
  providedIn: 'root',
})
export class BinanceAPIService {
  private _ws: WebSocket | null = null;
  private _subject = new Subject<{ [key: string]: unknown }[]>();
  private _apiStatus: {
    endpoints: string | null;
    stream: string | null;
  } = {
      endpoints: null,
      stream: null,
    };
  fapi = new FAPI();
  api = new API();
  bapi = new BAPI(this.configSrv);
  constructor(private httpSrv: HttpClient, private configSrv: QideConfigService) { }

  stream(type: '24hrMiniTicker'): Subject<binance.api.fapi.Websocket.MiniTicker.Response>;
  stream(type: 'btcusdt@aggTrade'): Subject<binance.api.fapi.Websocket.MiniTicker.Response>;
  stream(type: '24hrTicker'): Subject<binance.api.fapi.Websocket.Ticker.Response>;
  stream(): Subject<{ [key: string]: unknown }[]>;
  stream(type?: string) {
    if (!this._ws) {
      this.connectStream();
    }
    if (type === '24hrMiniTicker') {
      return this._subject.pipe(
        filter(data => {
          return data[0] && data[0]['e'] === '24hrMiniTicker';
        }),
      ) as Subject<binance.api.fapi.Websocket.MiniTicker.Response>;
    } else if (type === '24hrTicker') {
      return this._subject.pipe(
        filter(data => {
          return data[0] && data[0]['e'] === '24hrTicker';
        }),
      ) as Subject<binance.api.fapi.Websocket.Ticker.Response>;
    } else {
      return this._subject;
    }
  }

  get apiStatus() {
    return this._apiStatus;
  }

  get apiHost() {
    return {
      endpoint: ['https://www.suitechsui.io/fapi', 'https://www.binance.com/fapi', 'http://binance.money.com/fapi'],
      stream: ['wss://sdstream.yshyqxx.com/stream', 'wss://www.binance.com/stream', 'wss://binance-stream.money.com/stream'],
    };
  }

  connectStream() {
    const ws = (this._ws = new WebSocket('wss://sfstream.yshyqxx.com/stream'));
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['btcusdt@trade', '!ticker@arr'],
          id: 1,
        }),
      );
    };
    ws.onmessage = event => {
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const data = pako.inflate(new Uint8Array(reader.result as ArrayBuffer), { to: 'string' }); // Use pako to ungzip
            this._subject.next(JSON.parse(data));
          } catch (err) {
            // If decompression fails, assume the data is uncompressed text
            this._subject.next(JSON.parse(reader.result as string));
          }
        };
        reader.readAsArrayBuffer(event.data);
      } else if (typeof event.data === 'string') {
        this._subject.next(JSON.parse(event.data));
      } else {
        this._subject.error(new Error('Unknown data type'));
      }
    };
    ws.onclose = () => {
      this._subject.complete();
      this._ws = null;
    };
    ws.onerror = err => {
      this._subject.error(err);
      this._ws = null;
    };
  }

  testServer() {
    // Test endpoint
    of(...this.apiHost.endpoint)
      .pipe(
        concatMap(url => {
          return this.httpSrv.get(url + '/v1/ping').pipe(
            map(() => {
              return url;
            }),
          );
        }),
        catchError(err => {
          return of(null);
        }),
        filter(url => {
          return url !== null;
        }),
        take(1),
      )
      .subscribe(url => {
        this._apiStatus.endpoints = url;
      });
    if (this._ws) {
      this._apiStatus.stream = this._ws.url;
    }
  }

  marketDataEndpoint(name: 'continuousKlines', params: ContinuesKlinesRequest): Observable<ContinuesKlinesResponse>;
  marketDataEndpoint(name: 'orderBook', params: OrderBookRequestParams): Observable<OrderBookResponse>;
  marketDataEndpoint(name: string, params: unknown): unknown {
    if (name === 'continuousKlines' && isContinuousContractKlineRequestParams(params)) {
      return this.httpSrv.get<ContinuesKlinesResponse>(
        'https://www.suitechsui.io/fapi/v1/continuousKlines', {
        params: new HttpParams().appendAll(params),
      }
      );
    } else if (name === 'orderBook' && isOrderBookRequestParams(params)) {
      return this.httpSrv.get<OrderBookResponse>('https://www.suitechsui.io/fapi/v1/depth', { params: new HttpParams().appendAll(params) });
    }
    return;
  }
}
