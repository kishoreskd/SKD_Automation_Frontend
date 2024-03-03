import { Injectable } from '@angular/core';
import { Dashbord } from '../../../domain/model/dashbord.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../common-services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private readonly _http: HttpClient,
    private readonly _lsService: LocalStorageService) { }

  getAll(): Observable<Dashbord> {
    return this._http.get<Dashbord>(`Dashbord/dashbord/${this._lsService.getDepartmentId()}`);
  }

  // getByMonthYear(date: Date) {

  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   // [HttpGet("get_all_by_monthyear/departmentid={departmentid}&month={month}&year={year}")]
  //   return this._http.get<Dashbord>(`Dashbord/dashbord/${this._lsService.getDepartmentId()}/${month}/${year}`)
  // }

  getByMonthYear(pluginId: number, date: Date) {

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    // [HttpGet("get_all_by_monthyear/departmentid={departmentid}&month={month}&year={year}")]
    return this._http.get<Dashbord>(`Dashbord/dashbord/${pluginId}/${month}/${year}`)
  }

}
