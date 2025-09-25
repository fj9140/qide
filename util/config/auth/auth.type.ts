export interface QideAuthConfig {
  login_url?: string;
  referrer_url?: string;
  token_invalid_redirect?: boolean;
  ignores?: (RegExp | string)[];
  store_key?: string;
  token_send_key?: string;
  /**
   * 发送token模板（默认为：`'${token}'`），使用 `${token}` 表示token点位符（**注意：**请务必使用 \`\` 包裹），例如：
   *
   * - `Bearer ${token}`
   */
  token_send_template?: string;
  /**
   * 发送token参数位置，默认：`header`
   */
  token_send_place?: 'header' | 'body' | 'url';
}
