import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiType } from '../api/index';
import { SnackBarService } from '../../shared/services/snack-bar.service';

@Injectable()
export class SnackBarInterceptor implements HttpInterceptor {
  constructor(private _snackBarService: SnackBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<ApiType.SuccessResponse>> {
    return next.handle(request).pipe(
      catchError((err: ApiType.ErrorResponse) => {
        console.log('err::', err);

        this._snackBarService.error(err?.error?.message?.toString());
        return throwError(err);
      }),
      tap(val => {
        if (val instanceof HttpResponse) {
          const responseBody = val.body as ApiType.SuccessResponse | string;
          if (
            typeof responseBody !== 'string' &&
            responseBody?.message !== 'success' &&
            responseBody?.message?.length
          )
            this._snackBarService.success(responseBody.message);
        }
        return of(val);
      })
    );
  }
}
