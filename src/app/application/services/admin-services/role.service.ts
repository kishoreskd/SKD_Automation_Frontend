import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../../domain/model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Role[]> {
    return this._http.get<Role[]>("Role/roles");
  }

}
