import { InjectionToken, makeEnvironmentProviders } from "@angular/core";
import { MockOptions } from "./interface";

export const QIDE_MOCK_CONFIG=new InjectionToken<MockOptions>('qide-mock-config')

export function provideMockConfig(config?:MockOptions){
  return makeEnvironmentProviders([{useValue:config,provide:QIDE_MOCK_CONFIG}])
}
