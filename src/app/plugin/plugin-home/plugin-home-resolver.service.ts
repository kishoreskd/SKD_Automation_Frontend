import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Plugin } from '../../domain/model/plugin-log.model';
import { Observable, catchError, of } from 'rxjs';
import { PluginService } from '../../services/plugin-services/plugin.service';

@Injectable({
  providedIn: 'root'
})
export class PluginHomeResolverService implements Resolve<Plugin[]> {
  //Using this resolver we could able check before navigating to respective page. If there is any error it will helps 
  //navigate to another page or else could able to show the error page like that.
  constructor(private _router: Router, private _Service: PluginService) { }
  resolve(): Observable<Plugin[]> {
    console.log("Resolver working...");
    return this._Service.getAll().pipe(catchError(error => {
      this._router.navigate(['/error-page']); //not yet implemented!
      console.log(error);
      return of(null);
    }));
  }
}
