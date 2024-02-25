import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly departmentId = "departmentId";
  
  constructor() { }

  updateDepartmentId(departmentId: number) {
    localStorage.clear();
    localStorage.setItem(this.departmentId, departmentId.toString())
  }

  getDepartmentId(): number {
    return +localStorage.getItem(this.departmentId);
  }

}
