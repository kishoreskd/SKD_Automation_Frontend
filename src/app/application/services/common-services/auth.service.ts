import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // isLoggedIn: boolean = false;
  public payLoad: any;

  constructor() {
    console.log("Auth service called!");
    this.decodeToken();
  }

  public decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    this.payLoad = jwtHelper.decodeToken(token);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
    // this.isLoggedIn = true;
    // this.isLoggedIn$.next(!!localStorage.getItem("token"))
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  removeToken() {
    // console.log("called");
    localStorage.removeItem("token");
    // this.isLoggedIn = true;
    // this.isLoggedIn$.next(false);
  }

  setRefreshToken(token: string) {
    localStorage.setItem("refreshtoken", token);
  }

  getRefreshToken(): string {
    return localStorage.getItem("refreshtoken");
  }

  getUserNameFromToken(): string {
    return this.payLoad.unique_name;
  }

  getEmployeeIdFromToken(): number {
    return this.payLoad.employeeId;
  }

  getRoleFromToken(): string {
    return this.payLoad.role;
  }

  isLoggedIn(): boolean {
    // this.isLoggedIn$.next(!!localStorage.getItem("token"));

    // if (this.getToken() === null || this.getToken() === undefined) {
    //   this.isLoggedIn$.next(false);
    // }

    // return this.isLoggedIn$.asObservable();
    return !!localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshtoken");
  }
}
