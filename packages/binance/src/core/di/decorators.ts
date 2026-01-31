import { container } from "./container";

export interface InjectableOptions {
  singleton?: boolean;
}

export function Injectable(options: InjectableOptions = { singleton: true }) {
  return function <T extends new (...args: any[]) => any>(target: T) {
    // 自动注册到容器
    container.register(target, target, {
      singleton: options.singleton,
      dependencies: Reflect.getMetadata("design:paramtypes", target) || [],
    });
    return target;
  };
}

export function inject<T>(token: new (...args: any[]) => T): T {
  return container.get(token);
}
