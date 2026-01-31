type Constructor<T = {}> = new (...args: any[]) => T;
type ServiceToken<T = any> = Constructor<T> | string | symbol;

class DIContainer {
  private static instance: DIContainer;
  private metadata = new Map<
    ServiceToken,
    { singleton: boolean; dependencies: ServiceToken[] }
  >();
  private singletons = new Map<ServiceToken, any>();
  private services = new Map<ServiceToken, any>();
  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  register<T>(
    token: ServiceToken<T>,
    impl: Constructor<T>,
    options: { singleton?: boolean; dependencies?: ServiceToken[] } = {},
  ): void {
    this.services.set(token, impl);
    this.metadata.set(token, {
      singleton: options.singleton ?? true,
      dependencies: options.dependencies ?? [],
    });
  }

  clear(): void {
    this.services.clear();
    this.metadata.clear();
    this.singletons.clear();
  }

  get<T>(token: ServiceToken<T>): T {
    // 如果是单例且存在，返回
    if (this.metadata.get(token)?.singleton && this.singletons.has(token)) {
      return this.singletons.get(token);
    }

    const impl = this.services.get(token);
    if (!impl) {
      throw new Error(`Service ${String(token)} not found`);
    }

    // 解析依赖
    const metadata = this.metadata.get(token);
    const deps =
      metadata?.dependencies.filter(
        // 依赖分析如果是基础类型则忽略
        (dep) => dep["name"] && dep["name"] !== "String",
      ) ?? [];
    const resolvDeps = deps.map((dep) => this.get(dep));

    // 创建实例
    const instance = new impl(...resolvDeps);

    // 如果是单例，缓存它
    if (metadata?.singleton) {
      this.singletons.set(token, instance);
    }
    return instance;
  }
}

export const container = DIContainer.getInstance();
