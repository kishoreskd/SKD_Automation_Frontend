import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponseBase, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize, tap } from 'rxjs';
import { LoaderService } from '../common/loader.service';
import { AlertifyService } from '../common/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private _loader: LoaderService, private _alertify: AlertifyService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loader.loaderVisible.next(true);
    // console.log("Interceptor Started", req);
    const newReq = req.clone({ url: "http://localhost:45300/" + req.url, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
    // console.log(newReq);
    return next.handle(newReq).pipe(
      tap({
        error: (_error) => {
          let val = "";
          console.log(_error)
          if (_error.error.ErrorCode) {
            val = _error.error.ErrorCode + "/" + _error.error.ErrorMessage;
          } else {
            val = _error.error.status + "/" + _error.error.title;
          }

          this._alertify.error(val);
        }
      }),
      finalize(() => {
        this._loader.loaderVisible.next(false);

        // this._loader.hideLoader();
      })
    );
  }

}



// import { finalize, tap } from 'rxjs';
// import { MessageService } from '../message.service';

// @Injectable()
// export class LoggingInterceptor implements HttpInterceptor {
//   constructor(private messenger: MessageService) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     const started = Date.now();
//     let ok: string;

//     // extend server response observable with logging
//     return next.handle(req)
//       .pipe(
//         tap({
//           // Succeeds when there is a response; ignore other events
//           next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
//           // Operation failed; error is an HttpErrorResponse
//           error: (_error) => (ok = 'failed')
//         }),
//         // Log when response observable either completes or errors
//         finalize(() => {
//           const elapsed = Date.now() - started;
//           const msg = `${req.method} "${req.urlWithParams}"
//              ${ok} in ${elapsed} ms.`;
//           this.messenger.add(msg);
//         })
//       );
//   }
// }
