import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@core/services/token.service';

export const authInterceptor: HttpInterceptorFn = (() => {
  let tokenService: TokenService;

  return (req, next) => {
    tokenService ??= inject(TokenService);

    const token = tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next(req);
  };
})();
