import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaderVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoader(): void {
    this.loaderVisible.next(true);
  }

  hideLoader(): void {
    this.loaderVisible.next(false);
  }

  getLoaderVisibility(): Observable<any> {
    return this.loaderVisible.asObservable();
  }

}
  