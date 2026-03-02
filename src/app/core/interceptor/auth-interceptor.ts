import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../authService';
import { TokenSerivce } from '../Services/token-serivce';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (() => {
  let tokenService: TokenSerivce;

  return (req, next) => {
    tokenService ??= inject(TokenSerivce);

    const token = tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }
    return next(req);
  };
})();
