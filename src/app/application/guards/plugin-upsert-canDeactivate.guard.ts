import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PluginUpsertComponent } from '../../components/plugin/plugin-upsert/plugin-upsert.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PluginUpsertCanDeactivateGuardService implements CanDeactivate<PluginUpsertComponent> {

  canDeactivate(component: PluginUpsertComponent): boolean {
    if (component._pluginFrm.dirty) {
      return confirm("Are you sure want to discard the changes!");
    }

    return true;
  }

}
