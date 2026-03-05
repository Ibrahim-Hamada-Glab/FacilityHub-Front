import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  var authService = inject(AuthService);
  var router = inject(Router);
  if (!authService.IsAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  return true;


  
};
