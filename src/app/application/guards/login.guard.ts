import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/common-services/auth.service';

export const LoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);


  if (_authService.isLoggedIn()) {
    _router.navigate(['/dashbord']);
    return false;
  } else return true;


};
