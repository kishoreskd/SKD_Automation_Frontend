import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiToken } from '../../domain/model/ApiToken.model';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  constructor(private readonly _http: HttpClient) { }

  generateToken(id: number): Observable<ApiToken> {
    return this._http.get<ApiToken>(`api/AuthenticateApi/authenticate/${id}`);
  }
}
