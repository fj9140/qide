
import { Inject, Injectable, Optional } from "@angular/core";
import { AppConfig, AppConfigKey, APP_CONFIG } from "./config.type";
import { deepMergeKey } from "@qide/util/other";

@Injectable({ providedIn: 'root' })
export class QideConfigService {

  private config: AppConfig;

  constructor(@Optional() @Inject(APP_CONFIG) defaultConfig?: AppConfig) {
    this.config = { ...defaultConfig };
  }

  get<T extends AppConfigKey>(componentName: T, key?: string): AppConfig[T] {
    const res = (this.config[componentName] as { [key: string]: unknown }) || {}
    return key ? { [key]: res[key] } : res
  }

  merge<T extends AppConfigKey>(componentName: T, ...defaultValues: Array<AppConfig[T]>): AppConfig[T] {
    return deepMergeKey({}, true, ...defaultValues, this.get(componentName))
  }
}
