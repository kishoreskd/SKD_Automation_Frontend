import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginHomeComponent } from './components/plugin/plugin-home/plugin-home.component';
import { PluginLogHomeComponent } from './components/plugin/log-home/plugin-log-home.component';
import { DashbordComponent } from './components/dashbord/home/dashbord.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './application/guards/authentication.guard';
import { UserHomeComponent } from './components/admins/user/user-home/user-home.component';
import { LoginGuard } from './application/guards/login.guard';
import { AdminHomeComponent } from './components/admins/home/admin-home.component';
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
