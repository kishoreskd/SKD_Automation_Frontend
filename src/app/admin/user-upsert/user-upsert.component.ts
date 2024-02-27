import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RoleService } from '../../application/services/admin-services/role.service';
import { Role } from '../../domain/model/role.model';
import { User } from '../../domain/model/user';
import { AlertifyService } from '../../application/services/common-services/alertify.service';
import { UserService } from '../../application/services/admin-services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserStoreService } from '../../application/services/common-services/user-store.service';
import { AuthService } from '../../application/services/common-services/auth.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent implements OnInit {

  user: User = new User();
  registerFrm: FormGroup;
  roles: Array<Role>;
  roleId: number;
  action: string = "Save";

  constructor(
    @Inject(MAT_DIALOG_DATA) public _dialogData: User,
    private _fb: FormBuilder,
    private readonly _roleService: RoleService,
    private readonly _userService: UserService,
    private readonly _alertify: AlertifyService,
    private _userDialog: MatDialogRef<UserUpsertComponent>,
    private readonly _userStoreService: UserStoreService,
    private readonly _authService: AuthService) { }

  ngOnInit() {
    this.createForm();
    this.getRoles();
    this.patchObj();
  }

  //#region Get Form Control

  get userName(): FormControl {
    return this.getControl("userName");
  }

  get password(): FormControl {
    return this.getControl("password");
  }

  get roleName(): FormControl {
    return this.getControl("roleName");
  }

  get employeeId(): FormControl {
    return this.getControl("employeeId");
  }

  getControl(field: string): FormControl {
    return this.registerFrm.get(field) as FormControl;
  }

  //#endregion

  createForm() {
    this.registerFrm = this._fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      employeeId: [null, [Validators.required]],
      roleName: [[Validators.required]]
    });
  }

  patchObj() {
    if (this._dialogData.id !== 0) {
      this.action = "Update";
      this.registerFrm.patchValue(this._dialogData);
      this.password.setValue("");
    }
  }

  onFrmSubmit() {

    if (this.registerFrm.valid) {
      this.map();
      if (this._dialogData.id === 0) {
        this.add();
      } else {
        this.update();
      }
      this._userDialog.close(false);
    }
  }

  add() {

    this.user.createdBy = this._authService.getEmployeeIdFromToken();

    this._userService.add(this.user).subscribe((data: User) => {
      this._alertify.showSuccess("User added successfully!");
    })
  }

  update() {

    this.user.id = this._dialogData.id;
    this.user.lastModifiedBy = this._authService.getEmployeeIdFromToken();

    this._userService.update(this._dialogData.id, this.user).subscribe((data: User) => {
      this._alertify.showSuccess("User updated successfully!");
    })
  }

  getRoles() {
    this._roleService.getAll().subscribe((data: Role[]) => {
      this.roles = data;
      this.roleName.setValue(this._dialogData.roleId);
    });
  }

  map() {
    this.user.userName = this.userName.value;
    this.user.roleId = this.roleName.value;
    this.user.password = this.password.value;
  }

}
