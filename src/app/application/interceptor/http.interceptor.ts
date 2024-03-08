import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, EmptyError, Observable, catchError, delay, filter, finalize, switchMap, take, tap, throwError } from 'rxjs';
import { LoaderService } from '../services/common-services/loader.service';
import { AlertifyService } from '../services/common-services/alertify.service';
import { AuthService } from '../services/common-services/auth.service';
import { AuthToken } from '../../domain/model/authToken.model';
import { LoginService } from '../services/common-services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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

  private isRefreshing: boolean = false;
  private refreshTokenObject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //   this._loader.loaderVisible.next(true);
  //   const token = this._authService.getToken();


  //   const newReq = req.clone({
  //     url: "http://localhost:45300/" + req.url, headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-key-lgn': `Bearer ${token}` })
  //   })

  //   // console.log(newReq.url);

  //   return next.handle(newReq).pipe(

  //     catchError((error) => {

  //       if (error instanceof HttpErrorResponse) {
  //         if (error.status === 401) {
  //           return this.handleUnAuthorizedError(req, next)
  //         };
  //         if (error.status === 404) this.CustomeErroShow(error);
  //         if (error.status === 0) {
  //           this._router.navigate(['/plugin/home']);
  //         }
  //       }

  //       return throwError(() => error);
  //     }),
  //     finalize(() => {
  //       this._loader.loaderVisible.next(false);
  //     })
  //   )

  //   // return next.handle(newReq).pipe(
  //   //   tap({
  //   //     error: (error: any) => {

  //   //       let val = "";
  //   //       if (error instanceof HttpErrorResponse) {

  //   //         if (error.status === 401) {
  //   //           return this.handleUnAuthorizedError(req, next);
  //   //         }
  //   //       }

  //   //       if (error.error?.ErrorCode) {
  //   //         val = error.error.ErrorCode + "/" + error.error.ErrorMessage;
  //   //       } else {
  //   //         val = error.error.status + "/" + error.error.title;
  //   //       }

  //   //       this._alertify.showError(val);
  //   //       return throwError(() => error);
  //   //     }
  //   //   }),
  //   //   finalize(() => {
  //   //     this._loader.loaderVisible.next(false);
  //   //     // this._loader.hideLoader();
  //   //   })
  //   // );
  // }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log("Request block");

    this._loader.loaderVisible.next(true);
    const token = this._authService.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._authService.logOut();
            this._router.navigate(['/login'])
            // return this.handleUnAuthorizedError(req, next)
          };
          if (error.status === 404 || error.status === 400 || error.status === 500) this.CustomeErroShow(error);
          if (error.status === 400) this.CustomeErroShow(error);
          if (error.status === 0) {
            this._alertify.error("Server down please try again later!");
            this._router.navigate(['/plugin/home']);
          }
        }

        return throwError(() => error);
      }),
      finalize(() => {
        this._loader.loaderVisible.next(false);
      })
    )
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshing) {

      this.isRefreshing = true;
      this.refreshTokenObject.next(null);

      let tokenApi = new AuthToken();
      tokenApi.accessToken = this._authService.getToken();
      tokenApi.refreshToken = this._authService.getRefreshToken();

      return this._loginService.renewToken(tokenApi)
        .pipe(
          switchMap((data: AuthToken) => {

            this._authService.setToken(data.accessToken);
            this._authService.setRefreshToken(data.refreshToken);

            this.isRefreshing = false;
            this.refreshTokenObject.next(data.accessToken);

            return next.handle(this.addToken(req, data.accessToken));

          }), catchError((err: any) => {
            // console.log("ERRor blocka");

            this._authService.logOut();
            this._router.navigate(['/login'])
            this._alertify.error("Token is expired, Please Login again");
            return EMPTY;
          }),

        )
    } else {
      return this.refreshTokenObject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => next.handle(this.addToken(req, this._authService.getToken())))
      )
    }
  }



  // handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {

  //   // console.log("un authorized called!");

  //   let tokenApi = new AuthToken();
  //   tokenApi.accessToken = this._authService.getToken();
  //   tokenApi.refreshToken = this._authService.getRefreshToken();

  //   return this._loginService.renewToken(tokenApi)
  //     .pipe(
  //       switchMap((data: any) => {
  //         // console.log(data);

  //         this._authService.setToken(data.accessToken);
  //         this._authService.setRefreshToken(data.refreshToken);

  //         req = req.clone({
  //           url: "http://localhost:45300/" + req.url, headers: new HttpHeaders({ 'Content-Type': 'application/json', 'auth-key-lgn': `Bearer ${data.accessToken}` })
  //         });

  //         return next.handle(req);

  //       }), catchError((err: any) => {

  //         console.log("Token is expired");
  //         this._alertify.showWarn("Token is expired, Please Login again");
  //         this._authService.logOut();
  //         this._router.navigate(['/login'])
  //         return EMPTY;

  //       }),

  //       // catchError(err => '')
  //     )
  // }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req = req.clone({
      url: environment.apiUrl + "/" + req.url, headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'auth-key-lgn': `Bearer ${token}`       
      })
    });
  }

  CustomeErroShow(error: HttpErrorResponse) {
    console.log(error);

    let str = "";
    if (error.error.errorCode !== undefined) {
      str = error.error.errorCode + "/ " + error.error.errorMessage;
    }
    if (error.error.ErrorCode !== undefined) {
      str = error.error.ErrorCode + "/ " + error.error.ErrorMessage;
    }

    this._alertify.error(str);
  }
}




