import { EnvironmentProviders, InjectionToken, makeEnvironmentProviders } from "@angular/core";
import { QideAuthConfig } from "./auth/auth.type";
import { AppCommonHttpClientConfig } from "./common/http.type";
import { QideBinanceConfig } from "./binance/binance.type";

export interface AppConfig {
  auth?: QideAuthConfig;
  commonHttp?: AppCommonHttpClientConfig;
  binance?: QideBinanceConfig
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app-config', {
  providedIn: 'root',
  factory: APP_CONFIG_FACTORY
})

export function APP_CONFIG_FACTORY(): AppConfig {
  return {}
}

export type AppConfigKey = keyof AppConfig;

export function provideQideConfig(config: AppConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: APP_CONFIG, useValue: config }])
}
