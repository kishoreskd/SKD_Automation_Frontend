import { Injectable } from '@angular/core';
import { RoleEnum } from '../../../domain/enums/role.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessPermissionService {

  RoleEnum = RoleEnum;
  role: string;

  constructor(public _authService: AuthService) {
  }

  loadPermission() {
  }

  canWrite(): boolean {
    this.role = this._authService.getRoleFromToken().toUpperCase();
    return (this.role === RoleEnum.ADMIN || this.role === RoleEnum.MANAGER || this.role === RoleEnum.TEAMLEAD);
  }

  canRead(): boolean {
    return true;
  }

  canDelete(): boolean {
    this.role = this._authService.getRoleFromToken().toUpperCase();
    return (this.role === RoleEnum.ADMIN || this.role === RoleEnum.MANAGER || this.role === RoleEnum.TEAMLEAD);
  }

  canUpdate(): boolean {
    this.role = this._authService.getRoleFromToken().toUpperCase();
    return (this.role === RoleEnum.ADMIN || this.role === RoleEnum.MANAGER || this.role === RoleEnum.TEAMLEAD);
  }
}
