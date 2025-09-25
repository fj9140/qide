import { InjectionToken } from "@angular/core";
import { ITokenModel } from "../token/interface";
import { QA_STORE_TOKEN_LOCAL_FACTORY } from "./local-storage.service";

export interface IStore{
  get(key:string):ITokenModel,
  set(key:string,value:ITokenModel):boolean;
  remove(key:string):void
}

export const QA_STORE_TOKEN=new InjectionToken<IStore>('AUTH_STORE_TOKEN',{
  providedIn:'root',
  factory:QA_STORE_TOKEN_LOCAL_FACTORY
})
