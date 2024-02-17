import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Plugin } from '../../domain/model/plugin-log.model';
import { delay } from 'rxjs';
import { concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PluginService {


  constructor(private _http: HttpClient) {
  }

  getAll(): Observable<Plugin[]> {
    return this._http.get<Plugin[]>("Plugin/get_all").pipe(delay(5000));

  }

  add(data: Plugin): Observable<any> {
    console.log(data);
    return this._http.post("Plugin/add_plugin", data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

}
