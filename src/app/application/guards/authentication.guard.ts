import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/common-services/auth.service';

export const AuthenticationGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  let isLoggedIn: boolean;
  const router = inject(Router);
  const authService = inject(AuthService);

  // router.navigate(['login']);
  // return false;
  // console.log("logged out");


  // authService.isLoggedIn().subscribe((d: boolean) => {
  //   isLoggedIn = d;
  // });

  // if (isLoggedIn) {
  //   return true;
  // } else {
  //   router.navigate(["/login"])
  //   return false;
  // }

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(["/login"])
    return false;
  }
};
