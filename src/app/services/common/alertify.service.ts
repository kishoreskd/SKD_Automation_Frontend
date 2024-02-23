import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  success(msg: string) {
    alertify.set('notifier', 'position', 'top-center');
    alertify.success(msg);
  }

  error(msg: string) {
    alertify.set('notifier', 'position', 'top-center');
    alertify.error(msg);
  }

  alert(msg: string) {
    alertify.alert('Automation', msg);
  }

  alertQA(msg: string): boolean {
    return alertify.confirm('Automation', msg, function () {
      return true;
    }, function () { return false });
  }

  confirm(msg: string, okCallback: () => any, cancelCallback?: () => any) {
    alertify.confirm("Confirmation", msg, () => { okCallback(); }, () => { if (cancelCallback) cancelCallback(); })
  }

  // alertQA(): any {
  //   return alertify.confirm();
  // }

}
