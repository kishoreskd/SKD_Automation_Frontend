import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly departmentKey = "departmentId";
  public departmentId = 0;

  constructor() { }

  setDepartmentId(departmentId: number) {
    this.departmentId = departmentId;
    localStorage.removeItem(this.departmentKey);
    localStorage.setItem(this.departmentKey, departmentId.toString())
  }

  getDepartmentId(): number {
    this.departmentId = +localStorage.getItem(this.departmentKey);
    return this.departmentId;
  }

}
