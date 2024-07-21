import { InjectionToken } from "@angular/core";
import { QA_SERVICE_TOKEN_FACTORY } from "./token.service";

export const QA_SERVICE_TOKEN=new InjectionToken<ITokenService>('QA_SERVICE_TOKEN',{
  providedIn:'root',
  factory:QA_SERVICE_TOKEN_FACTORY
})

export interface ITokenService{
  readonly login_url:string|undefined;
}
