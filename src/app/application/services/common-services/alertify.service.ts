import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor(private _toast: NgToastService) { }
  success(msg: string) {
    alertify.set('notifier', 'position', 'top-center');
    // this._toast.success({ detail: "Automation", summary: msg, duration: 5000 });
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

  title = "Automation";

  // showSuccess(msg: string) {
  //   this._toast.success({ detail: "SUCCESS", summary: msg, duration: 5000 });
  // }

  // showError(msg: string) {
  //   this._toast.error({ detail: "ERROR", summary: msg, duration: 5000 });
  // }

  // showInfo(msg: string) {
  //   this._toast.info({ detail: "INFORMATION", summary: msg, sticky: true });
  // }

  // showWarn(msg: string) {
  //   this._toast.warning({ detail: "WARNING", summary: msg, duration: 5000 });
  // }

}
