import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/common-services/auth.service';

export const LoginGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const _router = inject(Router);
  const _authService = inject(AuthService);
  let isLoggedIn: boolean;


  // _authService.isLoggedIn().subscribe((d: boolean) => {
  //   isLoggedIn = d;
  // });


  // if (!isLoggedIn) {
  //   console.log("called loggin gaurd not logged in ");
  //   _router.navigate(['/login']);
  //   return true;
  // } else {
  //   console.log("called loggin gaurd not logged out");

  //   _router.navigate(['/dashbord']);
  //   return false;
  // }

  if (!_authService.isLoggedIn()) {
    console.log("called loggin gaurd not logged in ");
    _router.navigate(['/login']);
    return true;
  } else {
    console.log("called loggin gaurd not logged out");

    _router.navigate(['/dashbord']);
    return false;
  }

};
