import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, finalize, switchMap, tap, throwError } from 'rxjs';
import { LoaderService } from '../services/common-services/loader.service';
import { AlertifyService } from '../services/common-services/alertify.service';
import { AuthService } from '../services/common-services/auth.service';
import { AuthToken } from '../../domain/model/authToken.model';
import { LoginService } from '../services/common-services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private _loader: LoaderService,
    private _alertify: AlertifyService,
    private readonly _authService: AuthService,
    private _loginService: LoginService,
    private readonly _router: Router) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._loader.loaderVisible.next(true);
    const token = this._authService.getToken();

    const newReq = req.clone({
      url: "http://localhost:45300/" + req.url, headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
    })

    return next.handle(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return this.handleUnAuthorizedError(req, next);
          }
        }
        return throwError(() => error);
      }),
      finalize(() => {
        this._loader.loaderVisible.next(false);
      })
    )

    // return next.handle(newReq).pipe(
    //   tap({
    //     error: (error: any) => {

    //       let val = "";
    //       if (error instanceof HttpErrorResponse) {

    //         if (error.status === 401) {
    //           return this.handleUnAuthorizedError(req, next);
    //         }
    //       }

    //       if (error.error?.ErrorCode) {
    //         val = error.error.ErrorCode + "/" + error.error.ErrorMessage;
    //       } else {
    //         val = error.error.status + "/" + error.error.title;
    //       }

    //       this._alertify.showError(val);
    //       return throwError(() => error);
    //     }
    //   }),
    //   finalize(() => {
    //     this._loader.loaderVisible.next(false);
    //     // this._loader.hideLoader();
    //   })
    // );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {

    let tokenApi = new AuthToken();
    tokenApi.accessToken = this._authService.getToken();
    tokenApi.refreshToken = this._authService.getRefreshToken();

    return this._loginService.renewToken(tokenApi)
      .pipe(
        switchMap((data: any) => {
          console.log(data);

          this._authService.setToken(data.accessToken);
          this._authService.setRefreshToken(data.refreshToken);

          req = req.clone({
            url: "http://localhost:45300/" + req.url, headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.accessToken}` })
          });

          return next.handle(req);

        }), catchError((err) => {

          return throwError(() => {
            this._alertify.showWarn("Token is expired, Please Login again");
            this._router.navigate(['/login'])
          })
        })
      )
  }

}




