import { Injectable } from '@angular/core';
import { Dashbord } from '../../domain/model/dashbord';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private readonly _http: HttpClient) { }

  getAll(): Observable<Dashbord> {
    return this._http.get<Dashbord>("Dashbord/get_all");
  }

}
