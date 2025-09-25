import { EnvironmentProviders, makeEnvironmentProviders, Provider } from "@angular/core";
import { APP_CONFIG, AppConfig } from "@qide/util";

export interface AppProvideOptions{
  config?:AppConfig
}

export function provideApp(options:AppProvideOptions):EnvironmentProviders{
  const provides:Array<Provider|EnvironmentProviders>=[
    {provide:APP_CONFIG,useValue:options?.config}
  ]
  return makeEnvironmentProviders(provides);
}
