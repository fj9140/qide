import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponseBase,
} from "@angular/common/http";
import { catchError, mergeMap, Observable, of } from "rxjs";
import { toLogin } from "./helper";
import { Injector, inject } from "@angular/core";

export const CODEMESSAGE:{[key:number]:string}={
  401:"用户没有权限（令牌、用户名、密码错误）。"
}

function handleData(injector: Injector, ev: HttpResponseBase): Observable<any> {
  switch (ev.status) {
    case 200:
      break;
    case 204:
      break;
    case 401:
      toLogin(injector,CODEMESSAGE[401]);
      break;
    default:
      break;
  }
  return of(ev);
}

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  const injector = inject(Injector);
  const protocol=window.location.protocol
  const newReq=req.clone({
    url:protocol+(req.url.replace(/^(http|https):/,''))
  })
  return next(newReq).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        handleData(injector, err);
      }
      throw err;
    }),
    mergeMap((ev) => {
      if (ev instanceof HttpResponseBase) {
        return handleData(injector, ev);
      }
      return of(ev);
    }),
  );
};

