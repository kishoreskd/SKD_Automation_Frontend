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


  // [HttpGet("get_withlog/pluginId={pluginId}")]
  // [HttpGet("get_withlog_by_monthandyear/departmentid={departmentid}&month={month}&year={year}")]
  // [HttpGet("get_withlog_by_year/departmentid={departmentid}&year={year}")]

  getWithLog(pluginId: number): Observable<Plugin> {
    return this._http.get<Plugin>(`Plugin/get_withlog/pluginId=${pluginId}`);
  }

  getWithLogByMonthAndYear(departmentid: number, month: number, year: number): Observable<Plugin[]> {

    // Plugin/get_withlog_by_monthandyear/departmentid=1&month=2&year=2024

    return this._http.get<Plugin[]>(`Plugin/get_withlog_by_monthandyear/departmentid=${departmentid}&month=${month}&year=${year}`);
  }

  getWithLogByYear(departmentid: number, number, year: number) {
    return this._http.get<Plugin[]>(`Plugin/get_withlog_by_monthandyear/departmentid=${departmentid}&year=${year}`);
  }
}
