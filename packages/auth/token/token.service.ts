import { inject, Injectable } from "@angular/core";
import { QideAuthConfig } from "@qide/util/config/auth/auth.type";
import { QideConfigService } from "@qide/util/config/config.service";
import { mergeConfig } from "../auth.config";
import { AuthReferrer, ITokenModel, ITokenService } from "./interface";
import { QA_STORE_TOKEN } from "../store/interface";

export function QA_SERVICE_TOKEN_FACTORY(): ITokenService {
  return new TokenService(inject(QideConfigService))
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly store = inject(QA_STORE_TOKEN)
  private _options: QideAuthConfig;
  private _referrer: AuthReferrer = {
    url: null
  };

  constructor(configSrv: QideConfigService) {
    this._options = mergeConfig(configSrv);
  }

  get login_url() {
    return this._options.login_url;
  }

  get referrer() {
    return this._referrer
  }

  get options() {
    return this._options
  }

  set(data: ITokenModel): boolean {
    const res = this.store.set(this._options.store_key!, data);
    return res;
  }

  get(type?: any): any;
  get<T extends ITokenModel>(type?: new () => T): T;
  get<T extends ITokenModel>(type?: new () => T): T {
    const data = this.store.get(this._options.store_key!);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear(options: { onlyToken: boolean } = { onlyToken: false }) {
    let data: ITokenModel | null = null;
    if (options.onlyToken) {
      data = this.get() as ITokenModel;
      data.token = '';
      this.set(data)
    } else {
      this.store.remove(this._options.store_key!);
    }
  }
}
