import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginLog } from '../../domain/model/plugin-log.model';

@Injectable({
  providedIn: 'root'
})
export class PluginLogService {

  constructor(private _http: HttpClient) { }

  getAll(): Observable<PluginLog[]> {
    return this._http.get<PluginLog[]>("PluginLog/get_all");
  }

  add(data: PluginLog): Observable<any> {
    return this._http.post("Pluginlog/add_pluginlog", data)
  }

  update(id: number, data: PluginLog): Observable<any> {
    return this._http.put("PluginLog/update_pluginlog/" + id, data);
  }

  remove(id: number): Observable<any> {
    return this._http.delete("PluginLog/remove/" + id);
  }


  getByMonthYear(pluginId: number, month: number, year: number): Observable<PluginLog[]> {
    return this._http.get<PluginLog[]>(`PluginLog/get_by_monthandyear/pluginId=${pluginId}&month=${month}&year=${year}`);
  }

  getByYear(pluginId: number, year: number): Observable<PluginLog[]> {
    return this._http.get<PluginLog[]>(`PluginLog/get_by_year/pluginId=${pluginId}&year=${year}`);
  }

  getByPlugin(pluginId: number): Observable<PluginLog[]> {
    return this._http.get<PluginLog[]>("PluginLog/get_by_plugin/" + pluginId);
  }
}
