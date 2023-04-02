import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, Observable, retry, throwError, timer } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Injectable()
export class GlobalHttpErrorHandler implements HttpInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private loadingService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.setLoading(false);
      }),
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),

      catchError((err) => {
        console.log('Error handled by HTTP interceptor...');
        return throwError(() => {
          console.log('Error rethrown by HTTP interceptor');
          return err;
        });
      })
    );
  }
}
