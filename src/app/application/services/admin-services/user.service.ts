import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../domain/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this._http.get<User[]>("User/users");
  }

  add(data: User): Observable<User> {
    return this._http.post<User>("User/post/register", data);
  }

  update(userId: number, data: User): Observable<User> {
    return this._http.put<User>(`User/put/register/${userId}`, data);
  }

  remove(id: number): Observable<any> {
    return this._http.delete(`User/delete/user/${id}`);
  }

}
