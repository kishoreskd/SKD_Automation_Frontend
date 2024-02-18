import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PluginLog } from '../../domain/model/plugin-log.model';

@Injectable({
  providedIn: 'root'
})
export class PluginLogService {

  constructor(private _http: HttpClient) { }

  getSelected(pluginId: number): Observable<PluginLog[]> {
    return this._http.get<PluginLog[]>("PluginLog/get_all/" + pluginId);
  }

  getAll(): Observable<PluginLog[]> {
    return this._http.get<PluginLog[]>("PluginLog/get_all");
  }

  add(data: PluginLog): Observable<any> {
    return this._http.post("Pluginlog/add_pluginlog", data)
  }

  update(id: number, data: PluginLog): Observable<any> {
    return this._http.put("PluginLog/update_pluginlog/" + id, data);
  }

  remove(id: number, data: PluginLog): Observable<any> {
    return this._http.delete("PluginLog/remove/" + id);
  }
}
