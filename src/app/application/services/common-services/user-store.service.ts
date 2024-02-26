import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private employeeId$ = new BehaviorSubject<number>(0);

  constructor() { }

  public getRole() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(firstName: string) {
    this.fullName$.next(firstName);
  }

  public setEmployeeIdForStore(employeeId?: number) {
    this.employeeId$.next(employeeId == null ? 0 : employeeId)
  }

  public getEmployeeIdFromStore() {
    return this.employeeId$.asObservable();
  }

}
