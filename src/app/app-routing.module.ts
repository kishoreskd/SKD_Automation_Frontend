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
import { UserHomeComponent } from './components/admins/user/user-home/user-home.component';
import { LoginGuard } from './application/guards/login.guard';
import { AdminHomeComponent } from './components/admins/admin-home/admin-home.component';
import { DepartmentHomeComponent } from './components/admins/department/department-home/department-home.component';
import { RoleAuthGuard } from './application/guards/role-auth.guard';





const routes: Routes = [
    {
        path: "",
        component: DashbordComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: "admin/home",
        component: AdminHomeComponent,
        canActivate: [AuthenticationGuard, RoleAuthGuard]
    },
    {
        path: "",
        children: [
            {
                path: "admin/user-home", component: UserHomeComponent
            },
            {
                path: "admin/department-home", component: DepartmentHomeComponent
            }
        ],
        canActivate: [AuthenticationGuard, RoleAuthGuard]
    },
    {
        path: "dashbord",
        component: DashbordComponent,
        canActivate: [AuthenticationGuard]
        // resolve: { pluginLogCol: PluginLogHomeResolverService }
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: "plugin/home",
        component: PluginHomeComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: "",
        children:
            [
                { path: "plugin-log/:id", component: PluginLogHomeComponent }
            ],
        canActivate: [AuthenticationGuard]
    }
]



@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
})

export class AppRoutingModule { }
