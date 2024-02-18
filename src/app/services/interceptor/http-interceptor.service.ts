import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, finalize, tap } from 'rxjs';
import { LoaderService } from '../common/loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private _loader: LoaderService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loader.loaderVisible.next(true);
    console.log("Interceptor Started", req);
    const newReq = req.clone({ url: "http://localhost:45300/" + req.url, headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })

    return next.handle(newReq).pipe(
      tap({
        error: (_error) => console.log(_error)
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
