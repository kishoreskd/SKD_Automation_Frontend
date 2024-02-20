import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Plugin } from '../../domain/model/plugin.model';
import { delay } from 'rxjs';
import { concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PluginService {


  constructor(private _http: HttpClient) {
  }

  getAll(): Observable<Plugin[]> {
    return this._http.get<Plugin[]>("Plugin/get_all").pipe(delay(0));
  }

  getAllForYear(year: number): Observable<Plugin[]> {
    return this._http.get<Plugin[]>(`Plugin/get_all_with_log/year=${year}`);
  }

  getAllForMonth(month: number): Observable<Plugin[]> {
    return this._http.get<Plugin[]>(`Plugin/get_all_with_log/month=${month}`);
  }

  add(data: Plugin): Observable<any> {
    return this._http.post("Plugin/add_plugin", data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  update(id: number, data: Plugin): Observable<any> {
    return this._http.put("Plugin/update_plugin/" + id, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  remove(id: number): Observable<any> {
    return this._http.delete("Plugin/remove/" + id);
  }


}
