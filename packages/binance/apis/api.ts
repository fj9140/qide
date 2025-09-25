import { Observable } from 'rxjs';
import { binance } from 'money-printer-types/binance';
import { BaseAPI } from "./base-api";
import { getAnonmynousOpt } from "@qide/util/http/http";

export class API extends BaseAPI {



  get(apiName: 'ticker-24hr', symbols: string[]): Observable<binance.api.api.Ticker24hr.Response>;
  get(apiName: string, ...params: unknown[]) {
        if (apiName === 'ticker-24hr') {
      const symbols = params[0] as string[];
      return this.httpClient.get(
        `https://www.suitechsui.io/api/v3/ticker/24hr?symbols=[${symbols
          .map(val => {
            return `"${val}"`;
          })
          .join(',')}]`,getAnonmynousOpt())
    } else {
      return null;
    }
  }

}
