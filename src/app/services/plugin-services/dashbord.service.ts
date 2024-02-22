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

}
