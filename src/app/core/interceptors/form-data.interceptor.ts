import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UtilsService } from '@shared/services/utils.service';

@Injectable()
export class FormDataInterceptor implements HttpInterceptor {
  constructor(private _utils: UtilsService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const formDataType = request?.body?.formDataType;
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method) && formDataType) {
      // 有body的清除空
      const originBody = this._utils.removeNil(this._utils.omit(request.body, 'formDataType'));
      const body = new FormData();
      for (const key in originBody) {
        if (Object.prototype.hasOwnProperty.call(originBody, key)) {
          console.log(originBody[key]);
          const defaultElement = originBody[key];
          let element;
          console.log(typeof defaultElement === 'object' && !(defaultElement instanceof File));

          if (typeof defaultElement === 'object' && !(defaultElement instanceof File)) {
            element = JSON.stringify(defaultElement);
          } else {
            element = defaultElement;
          }
          body.append(key, element);
        }
      }
      const req: HttpRequest<any> = request.clone({
        body,
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
