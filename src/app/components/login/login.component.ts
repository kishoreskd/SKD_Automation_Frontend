import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../domain/model/login.model';
import { LoginService } from '../../application/services/common-services/login.service';
import { AuthToken } from '../../domain/model/authToken.model';
import { AuthService } from '../../application/services/common-services/auth.service';
import { LocalStorageService } from '../../application/services/common-services/local-storage.service';
import { Route, Router } from '@angular/router';
import ValidateForm from '../../application/helpers/validateForm.helper';
import { UserStoreService } from '../../application/services/common-services/user-store.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { AccessPermissionService } from '../../application/services/common-services/accessPermission.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login = new Login();
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'password';
  ermsg: string = "";
  isError: boolean = false;

  constructor(private _fb: FormBuilder,
    private readonly _loginService: LoginService,
    private _authService: AuthService,
    private readonly _router: Router,
    private readonly _permissionAccess : AccessPermissionService) { }


  ngOnInit() {
    this.createForm();
    this.loginForm.get('userName').setValue("2701");
    this.loginForm.get('password').setValue("KishIndi@345");
  }

  get userName(): FormControl {
    return this.getControl("userName");
  }

  get password(): FormControl {
    return this.getControl("password");
  }

  getControl(field: string): FormControl {
    return this.loginForm.get(field) as FormControl;
  }

  createForm() {
    this.loginForm = this._fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password')
  }

  hideAlertMsg() {
    this.isError = false;
  }

  onSubmit() {

    if (this.loginForm.valid) {
      this.map();

      this._loginService.authenticate(this.login).subscribe(
        {
          next: (data: AuthToken) => {
            this._authService.setToken(data.accessToken);
            this._authService.setRefreshToken(data.refreshToken);
            this._authService.decodeToken();
            this._permissionAccess.loadPermission();

            this._router.navigate(["/dashbord"]);
          },
          error: (err) => {
            if (err.status === 0) {
              this.isError = true;
              this.ermsg = "Server down, please try again later!"
            } else {
              this.isError = true;
              this.ermsg = err.error.errorMessage;
            }
          }
        }
      );

    } else {
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }

  map() {
    this.login.userName = this.userName.value;
    this.login.password = this.password.value;
  }

}
