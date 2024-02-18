import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginHomeComponent } from './plugin/plugin-home/plugin-home.component';
import { PluginUpsertComponent } from './plugin/plugin-upsert/plugin-upsert.component';
import { PluginHomeResolverService } from './plugin/plugin-home/plugin-home-resolver.service';
import { PluginUpsertCanDeactivateGuardService } from './plugin/plugin-upsert/plugin-upsert-canDeactivate-guard.service';
import { PluginLogHomeComponent } from './plugin-log/plugin-log-home/plugin-log-home.component';
import { PluginLogHomeResolverService } from './plugin-log/plugin-log-home/plugin-log-home-resolver.service';



const routes: Routes = [
    {
        path: "",
        component: PluginHomeComponent,
        resolve: { pluginCol: PluginHomeResolverService }
    },
    {
        path: "plugin/home",
        component: PluginHomeComponent,
        resolve: { pluginCol: PluginHomeResolverService }
    },
    {
        path: "plugin/upsert",
        component: PluginUpsertComponent,
        canDeactivate: [PluginUpsertCanDeactivateGuardService]
    },
    {
        path: "plugin-log/:id",
        component: PluginLogHomeComponent,
        resolve: { pluginLogCol: PluginLogHomeResolverService }
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
