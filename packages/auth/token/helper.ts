import { QideAuthConfig } from '@qide/util/config';
import { HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { ALLOW_ANONYMOUS } from '../token';
import { SimpleTokenModel } from './simple/simple.model';

export function isAnoymous(req: HttpRequest<unknown>, options: QideAuthConfig): boolean {
  if (req.context.get(ALLOW_ANONYMOUS)) {
    return true;
  }

  if (Array.isArray(options.ignores)) {
    for (const item of options.ignores) {
      if (typeof item === 'string') {
        if (req.url.indexOf(item) >= 0) return true;
      } else {
        if (item.test(req.url)) return true;
      }
    }
  }

  return false;
}


export function throwErr(req: HttpRequest<unknown>, options: QideAuthConfig): Observable<HttpEvent<unknown>> {
  return new Observable((observer: Observer<HttpEvent<any>>) => {
    let statusText = '';
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      statusText = `来自 @qide/auth 的拦截，所请求URL未授权，若是登录API可加入 new HttpContext().set(ALLOW_ANONYMOUS, true) 来表示忽略校验，更多方法请参考： https://ng-alain.com/auth/getting-started#AlainAuthConfig\nThe interception from @delon/auth, the requested URL is not authorized. If the login API can add new HttpContext().set(ALLOW_ANONYMOUS, true) to ignore the check, please refer to: https://ng-alain.com/auth/getting-started#AlainAuthConfig`;
    }
    const res = new HttpErrorResponse({
      url: req.url,
      headers: req.headers,
      status: 401,
      statusText,
    });
    observer.error(res);
  });
}

export function CheckSimple(model: SimpleTokenModel | null): boolean {
  return model != null && typeof model.token === 'string' && model.token.length > 0;
}
