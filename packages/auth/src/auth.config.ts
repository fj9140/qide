import { AppAuthConfig } from "@qide/util/config/auth/auth.type";
import { AppConfigService } from "@qide/util/config/config.service";

export const AUTH_DEFAULT_CONFIG:AppAuthConfig={
  login_url:'/login'
}

export function mergeConfig(srv:AppConfigService):AppAuthConfig{
  return srv.merge('auth',AUTH_DEFAULT_CONFIG)!;
}
