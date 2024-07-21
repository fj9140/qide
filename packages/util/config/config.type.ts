import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import { AppAuthConfig } from "./auth/auth.type";

export interface AppConfig{
  auth?:AppAuthConfig;
}

export const APP_CONFIG=new InjectionToken<AppConfig>('app-config',{
  providedIn:'root',
  factory:APP_CONFIG_FACTORY
})

export function APP_CONFIG_FACTORY():AppConfig{
  return {}
}

export type AppConfigKey=keyof AppConfig;

export function provideQideConfig(config:AppConfig):EnvironmentProviders{
  return makeEnvironmentProviders([{provide:APP_CONFIG,useValue:config}])
}
