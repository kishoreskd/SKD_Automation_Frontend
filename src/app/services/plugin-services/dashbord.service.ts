import { Injectable } from '@angular/core';
import { Dashbord } from '../../domain/model/dashbord';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../common/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  constructor(private readonly _http: HttpClient,
    private readonly _lsService: LocalStorageService) { }

  getAll(): Observable<Dashbord> {
    return this._http.get<Dashbord>(`Dashbord/get_all/departmentid=${this._lsService.getDepartmentId()}`);
  }

  getByMonthYear(month: number, year: number) {
    // [HttpGet("get_all_by_monthyear/departmentid={departmentid}&month={month}&year={year}")]
    return this._http.get<Dashbord>(`Dashbord/get_all_by_monthyear/departmentid=${this._lsService.getDepartmentId()}&month=${month}&year=${year}`)
  }

}
