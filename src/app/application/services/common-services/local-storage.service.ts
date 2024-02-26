import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly departmentId = "departmentId";
  
  constructor() { }

  setDepartmentId(departmentId: number) {
    localStorage.removeItem(this.departmentId);
    localStorage.setItem(this.departmentId, departmentId.toString())
  }

  getDepartmentId(): number {
    return +localStorage.getItem(this.departmentId);
  }

  

}
