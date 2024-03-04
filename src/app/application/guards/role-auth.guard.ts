import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/common-services/auth.service';
import { inject } from '@angular/core';
import { RoleEnum } from '../../domain/enums/role.enum';

export const RoleAuthGuard: CanActivateFn = (route, state) => {

  const roleEnum = RoleEnum;
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    if (authService.getRoleFromToken().toUpperCase() === roleEnum.ADMIN) {
      return true;
    }
    else {
      router.navigate(['/dashbord']);
      return false;
    }
  } else {
    return false;
  }

};
