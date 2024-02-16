import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluginHomeComponent } from './plugin/plugin-home/plugin-home.component';
import { PluginUpsertComponent } from './plugin/plugin-upsert/plugin-upsert.component';



const routes: Routes = [
    { path: "", component: PluginHomeComponent },
    { path: "plugin/home", component: PluginHomeComponent },
    { path: "plugin/upsert", component: PluginUpsertComponent },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }
