import { HttpInterceptorFn, HttpResponseBase } from '@angular/common/http';
import { mergeMap, Observable, of } from 'rxjs';
import { toLogin } from './help';
import { Injector,inject } from '@angular/core';

function handleData(injector:Injector,ev: HttpResponseBase): Observable<any> {
  switch(ev.status){
    case 200:
      break;
    case 401:
      toLogin(injector)
      break;
    default:
      break;
  }
  return of(ev);
}

export const defaultInterceptor: HttpInterceptorFn = (req, next) => {
  const injector=inject(Injector)
  return next(req).pipe(
    mergeMap((ev) => {
      if (ev instanceof HttpResponseBase) {
        return handleData(injector,ev);
      }
      return of(ev);
    }),
  );
};
