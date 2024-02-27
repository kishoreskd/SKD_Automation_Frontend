import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginHomeComponent } from './plugin/plugin-home/plugin-home.component';
import { PluginUpsertComponent } from './plugin/plugin-upsert/plugin-upsert.component';
import { PluginHomeResolverService } from './application/resolver/plugin-home.resolver';
import { PluginUpsertCanDeactivateGuardService } from './application/guards/plugin-upsert-canDeactivate.guard';
import { PluginLogHomeComponent } from './plugin-log/plugin-log-home/plugin-log-home.component';
import { PluginLogHomeResolverService } from './application/resolver/plugin-log-home.resolver';
import { PluginLogChartComponent } from './dashbord/plugin-log-chart/plugin-log-chart.component';
import { PluginChartComponent } from './dashbord/plugin-chart/plugin-chart.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './application/guards/authentication.guard';
import { UserHomeComponent } from './admin/user-home/user-home.component';
import { LoginGuard } from './application/guards/login.guard';



const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: "plugin/home",
        component: PluginHomeComponent,
        resolve: { pluginCol: PluginHomeResolverService },
        canActivate: [AuthenticationGuard],
    },
    {
        path: "plugin/upsert",
        component: PluginUpsertComponent,
        canDeactivate: [PluginUpsertCanDeactivateGuardService],
        canActivate: [AuthenticationGuard]
    },
    {
        path: "plugin-log/:id",
        component: PluginLogHomeComponent,
        canActivate: [AuthenticationGuard]
        // resolve: { pluginLogCol: PluginLogHomeResolverService }
    },
    {
        path: "plugin-chart/:id",
        component: PluginChartComponent,
        canActivate: [AuthenticationGuard]
        // resolve: { pluginLogCol: PluginLogHomeResolverService }
    },
    {
        path: "plugin-log-chart/:id",
        component: PluginLogChartComponent,
        canActivate: [AuthenticationGuard]
        // resolve: { pluginLogCol: PluginLogHomeResolverService }
    },
    {
        path: "dashbord",
        component: DashbordComponent,
        canActivate: [AuthenticationGuard]
        // resolve: { pluginLogCol: PluginLogHomeResolverService }
    },
    {
        path: "admin/user-home",
        component: UserHomeComponent,
        canActivate: [AuthenticationGuard]
        // resolve: { pluginLogCol: PluginLogHomeResolverService }
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
