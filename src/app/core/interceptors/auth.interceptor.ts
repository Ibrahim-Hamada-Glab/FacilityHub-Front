import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, shareReplay, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { BackEndResponse, LoginResponse } from '@app/features/auth/models/login-request.model';

export const authInterceptor: HttpInterceptorFn = (() => {
  let tokenService: TokenService;
  let refreshInProgress: Observable<BackEndResponse<LoginResponse>> | null = null;

  return (req, next) => {
    tokenService ??= inject(TokenService);
    const authService = inject(AuthService);

    const token = tokenService.getToken();
    req = req.clone({
      withCredentials: true,

      setHeaders: { 
         
        mode: 'cors' 
      },
    });
    if (token) {
      req = req.clone({
        setHeaders: { 
          Authorization: `Bearer ${token}` ,
        },
      });
      return next(req).pipe(
        catchError((error) => {
          if (error.status === 401) {
            if (!refreshInProgress) {
              console.log('Refreshing token');
              console.log(req);
          
              refreshInProgress = authService.refreshToken().pipe(
                shareReplay({ bufferSize: 1, refCount: true }),
                finalize(() => {
                  refreshInProgress = null;
                })
              );
            }
            return refreshInProgress.pipe(
              switchMap(() => {
                const newToken = tokenService.getToken();
                const retryReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` },
                });
                return next(retryReq);
              }),
              catchError((refreshError) => throwError(() => refreshError))
            );
          }
          return throwError(() => error);
        })
      );
    }
    req = req.clone({
      setHeaders: { 
        withCredentials: 'true',
        "Access-Control-Allow-Origin": "*",
       },
    });
   
    return next(req);
  };
})();
