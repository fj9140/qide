import {HttpInterceptorFn, HttpRequest, HttpResponseBase, HttpResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {MockService} from '@qide/mock';
import {Observable, of, map, delay} from 'rxjs';

export const mockInterceptor: HttpInterceptorFn = (req, next) => {
  const mockSrv = inject(MockService);
  const rule = mockSrv.getRule(req.method, req.url);
  if (!rule) {
    return next(req);
  }

  let ob: Observable<HttpResponse<unknown>>;
  switch (typeof rule.value) {
    case 'string':
      ob = of(new HttpResponse({body: rule.value}));
      break;
    case 'function':
      ob = rule.value(req).pipe(map((body: any) => new HttpResponse({body})));
      break;
    case 'object':
      ob = of(new HttpResponse({body: rule.value}));
      break;
    default:
      ob = of(new HttpResponse({body: '123'}));
  }
  return ob.pipe(delay(1));
};
