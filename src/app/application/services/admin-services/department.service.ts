import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../../../domain/model/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Department[]> {
    return this._http.get<Department[]>("Department/get_all");
  }

  add(data: Department): Observable<Department> {
    return this._http.post<Department>("Department/post", data);
  }

  update(id: number, data: Department): Observable<Department> {
    return this._http.put<Department>(`Department/put/${id}`, data);
  }

  remove(id: number): Observable<any> {
    return this._http.delete(`Department/remove/${id}`);
  }

}
