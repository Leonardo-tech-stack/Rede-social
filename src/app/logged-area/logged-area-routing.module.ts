import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoggedAreaComponent } from "./logged-area.component";


const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
}, {
    path: '',
    component: LoggedAreaComponent,

    children: [{
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoggedAreaRoutingModule { }