import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../../domain/model/login.model';
import { AuthToken } from '../../../domain/model/authToken.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  authenticate(data: Login): Observable<AuthToken> {
    return this._http.post<AuthToken>("Login/authenticate", data)
  }

  refreshToken(data: Login): Observable<AuthToken> {
    return this._http.post<AuthToken>("Login/token/refresh", data);
  }
}
