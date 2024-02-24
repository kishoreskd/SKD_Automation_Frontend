import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const AuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router = inject(Router);
  const val = true;

  if (val) {
    // alert("You are successfully logged in");
    return true;
  } else {
    router.navigate(['login']);
  }

  return true;
};
