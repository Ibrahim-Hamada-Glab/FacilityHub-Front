import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.checkAuth().pipe(
    map((isAuthenticated) =>
      isAuthenticated ? router.createUrlTree(['/home']) : true
    )
  );
};
