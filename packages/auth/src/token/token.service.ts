import { inject, Injectable } from "@angular/core";
import { AppAuthConfig } from "@qide/util/config/auth/auth.type";
import { AppConfigService } from "@qide/util/config/config.service";
import { mergeConfig } from "../auth.config";
import { ITokenService } from "./interface";

export function QA_SERVICE_TOKEN_FACTORY():ITokenService{
  return new TokenService(inject(AppConfigService))
}

@Injectable()
export class TokenService{
  private _options:AppAuthConfig;

  constructor(configSrv:AppConfigService){
    this._options=mergeConfig(configSrv);
  }

  get login_url(){
    return this._options.login_url;
  }
}
