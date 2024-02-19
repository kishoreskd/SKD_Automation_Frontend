import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../domain/model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Department[]> {
    return this._http.get<Department[]>("Department/get_all");
  }

}
