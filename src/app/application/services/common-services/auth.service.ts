import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // isLoggedIn: boolean = false;


  constructor() { 
    this.decodeToken();
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
    // this.isLoggedIn$.next(false);
  }

  setRefreshToken(token: string) {
    localStorage.setItem("refreshtoken", token);
  }

  getRefreshToken() : string  {
    return localStorage.getItem("refreshtoken");
  }


  isLoggedIn(): boolean {
    // this.isLoggedIn$.next(!!localStorage.getItem("token"));
    // return this.isLoggedIn$.asObservable();
    return !!localStorage.getItem("token");
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }


}
