import type { QideBinanceConfig, QideConfigService } from "@qide/util/config";

export const BINANCE_DEFAULT_CONFIG: QideBinanceConfig = {
  localAgent: 'agent.nbfk.one'
}

export function mergeConfig(srv: QideConfigService): QideBinanceConfig {
  const config = srv.merge('binance', BINANCE_DEFAULT_CONFIG);
  if (!config) {
    throw new Error('binance config is not found');
  }
  return config
}
