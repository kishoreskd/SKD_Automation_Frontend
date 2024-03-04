import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Plugin } from '../../../domain/model/plugin.model';
import { delay } from 'rxjs';
import { concatMap } from 'rxjs';
import { LocalStorageService } from '../common-services/local-storage.service';

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

  getWithLogByMonthAndYear(pluginId: number, date: Date): Observable<Plugin> {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/${month}/${year}`);
  }

  getAllWithLogByMonthAndYear(date: Date): Observable<Plugin[]> {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this._http.get<Plugin[]>(`Plugin/plugins/${this._lsService.getDepartmentId()}/log/${month}/${year}`);
  }

  getWithLogByYear(pluginId: number, date: Date): Observable<Plugin> {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/${year}`);
  }

  // getWithLogByDay(pluginId: number, date: Date) {

  //   // console.log(date);

  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();

  //   // const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  //   // const isoDate = encodeURIComponent(utcDate.toISOString());

  //   // [HttpGet("plugin/{pluginId}/log/{day}/{month}/{year}")]
  //   return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/${day}/${month}/${year}`)
  // }

  // getWithLogByDay(pluginId: number, date: Date) {

  //   // console.log(date);

  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();

  //   // const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  //   const isoDate = encodeURIComponent(date.toISOString());
  //   // alert(isoDate);
  //   // [HttpGet("plugin/{pluginId}/log/{day}/{month}/{year}")]
  //   return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/day/${isoDate}`)
  // }


  getWithLogByDay(pluginId: number, date: Date) {

    // console.log(date);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    const isoDate = encodeURIComponent(date.toISOString());
    // alert(isoDate);
    // [HttpGet("plugin/{pluginId}/log/{day}/{month}/{year}")]
    return this._http.get<Plugin>(`Plugin/plugin/${pluginId}/log/${day}/${month}/${year}`)
  }

  //   const activationDate = this.getNowUTC();    

  public getLocal(date: Date) {
    // const now = new Date();
    return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
  }

  public getTopPlugin(count: number, date: Date): Observable<Plugin[]> {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return this._http.get<Plugin[]>(`Plugin/plugins/${this._lsService.getDepartmentId()}/top/${count}/log/${month}/${year}`);
  }

}
