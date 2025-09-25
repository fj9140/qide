import { QideAuthConfig } from '@qide/util/config/auth/auth.type';
import { QideConfigService } from '@qide/util/config/config.service';

export const AUTH_DEFAULT_CONFIG: QideAuthConfig = {}

export function mergeConfig(srv: QideConfigService): QideAuthConfig {
  const config = srv.merge('auth', AUTH_DEFAULT_CONFIG);
  if (!config) {
    throw new Error('auth config is not found');
  }
  return config;
}
