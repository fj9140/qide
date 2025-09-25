import { Observable } from "rxjs";
import { BaseAPI } from "./base-api";
import { binance } from "money-printer-types/binance";
import { Injectable } from "@angular/core";
import { QideBinanceConfig, QideConfigService } from "@qide/util/config";
import { mergeConfig } from "../binance.config";

export class BAPI extends BaseAPI {

  private _options: QideBinanceConfig;

  constructor(private configSrv: QideConfigService) {
    super()
    this._options = mergeConfig(configSrv)
  }

  get(apiName: 'compilance-symbol-list'): Observable<binance.api.bapi.ComplicanceSymbolList.Response>
  get(apiName: string, ...params: unknown[]) {
    if (apiName === "compilance-symbol-list") {
      return this.httpClient.get<binance.api.bapi.ComplicanceSymbolList.Response>(`${this._options.localAgent}/binance-compliance-symbolslist`)
    }
    return null
  }
}
