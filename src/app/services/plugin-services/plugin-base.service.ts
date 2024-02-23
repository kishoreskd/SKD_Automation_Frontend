import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Plugin } from '../../domain/model/plugin.model';
import { delay } from 'rxjs';
import { concatMap } from 'rxjs';
import { LocalStorageService } from '../common/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PluginService {

  private departmentId: number;

  constructor(private _http: HttpClient, private readonly _lsService: LocalStorageService) {
  }

  getAll(): Observable<Plugin[]> {
    return this._http.get<Plugin[]>("Plugin/plugins/all");
  }

  add(data: Plugin): Observable<any> {
    return this._http.post("Plugin/plugin/post", data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  update(id: number, data: Plugin): Observable<any> {
    return this._http.put("Plugin/plugin/put/" + id, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  remove(id: number): Observable<any> {
    return this._http.delete("Plugin/plugin/delete/" + id);
  }

  getByDepartment(): Observable<any> {
    // console.log(this._lsService.getDepartmentId());
    return this._http.get<Plugin[]>(`Plugin/departments/${this._lsService.getDepartmentId()}`);
  }

  getWithLog(pluginId: number): Observable<Plugin> {
    return this._http.get<Plugin>(`Plugin/plugins/${pluginId}/log`);
  }

  getWithLogByMonthAndYear(pluginId: number, month: number, year: number): Observable<Plugin> {

    // Plugin/get_withlog_by_monthandyear/departmentid=1&month=2&year=2024
    // [HttpGet("get_withlog_by_monthyear/pluginId={pluginId}&month={month}&year={year}")]
    // [HttpGet("get_withlog_by_monthyear/pluginId={pluginId}&month={month}&year={year}")]
    return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/${month}/${year}`);
  }

  getAllWithLogByMonthAndYear(month: number, year: number): Observable<Plugin[]> {

    // Plugin/get_withlog_by_monthandyear/departmentid=1&month=2&year=2024
    // [HttpGet("get_withlog_by_monthyear/pluginId={pluginId}&month={month}&year={year}")]

    return this._http.get<Plugin[]>(`Plugin/plugins/${this._lsService.getDepartmentId()}/log/${month}/${year}`);
  }

  getWithLogByYear(pluginId:number, year: number): Observable<Plugin> {
    return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/${year}`);
  }
}
