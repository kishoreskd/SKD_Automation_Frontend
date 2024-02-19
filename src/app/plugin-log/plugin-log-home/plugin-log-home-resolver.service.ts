import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { PluginLogService } from '../../services/plugin-services/plugin-log.service';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PluginLogHomeResolverService implements Resolve<PluginLog[]> {

  constructor(private _router: Router,
    private _service: PluginLogService,
    private route: ActivatedRoute) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<PluginLog[]> {
    const id = +route.params['id'];
    return this._service.getSelected(id).pipe(catchError(error => {
      this._router.navigate(['/']); 
      console.log(error);
      return of(null);
    }))
  }

}
