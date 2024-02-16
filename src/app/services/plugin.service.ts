import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Plugin } from '../domain/model/plugin-log.model';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  private _url: string;

  constructor(private _http: HttpClient) {
    this._url = "http://localhost:45300";
  }

  getAll(): Observable<Plugin[]> {
    return this._http.get<Plugin[]>(this._url + "/Plugin/get_all");
  }

  add(data: Plugin): Observable<any> {
    console.log(data);
    return this._http.post(this._url + "/Plugin/add_plugin", data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

}
