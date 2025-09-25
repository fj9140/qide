import { InjectionToken } from "@angular/core";
import { QA_SERVICE_TOKEN_FACTORY } from "./token.service";

export const QA_SERVICE_TOKEN=new InjectionToken<ITokenService>('QA_SERVICE_TOKEN',{
  providedIn:'root',
  factory:QA_SERVICE_TOKEN_FACTORY
})



export interface AuthReferrer {
  url:string|null|undefined
}

export interface ITokenService{
  readonly login_url:string|undefined;
  readonly referrer:AuthReferrer;

  /**
   * 设置 Token 信息，当用户 Token 发生变动时都需要调用此方法重新刷新
   * - 如果需要监听过期，需要传递 `expired` 值
   */
  set(data: ITokenModel | null): boolean;
  /**
   * 获取Token，形式包括：
   * - `get()` 获取 Simple Token
   * - `get<JWTTokenModel>(JWTTokenModel)` 获取 JWT Token
   */
  get(type?: any): ITokenModel | null;

  /**
   * 获取Token，形式包括：
   * - `get()` 获取 Simple Token
   * - `get<JWTTokenModel>(JWTTokenModel)` 获取 JWT Token
   */
  get<T extends ITokenModel>(type?: any): T;

    /**
   * 清除 Token 信息，当用户退出登录时调用。
   * ```
   * // 清除所有 Token 信息
   * tokenService.clear();
   * // 只清除 token 字段
   * tokenService.clear({ onlyToken: true });
   * ```
   */
  clear(options?: { onlyToken: boolean }): void;
}

export interface ITokenModel {
  [key: string]: any;

  token: string | null | undefined;

  /**
   * 过期时间，单位：ms
   * - 不管Simple、JWT模式都必须指定
   */
  expired?: number;
}
