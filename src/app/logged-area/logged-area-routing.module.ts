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
    }, {
        path: 'profile',
        loadChildren: () => import('./user-home/user-home.module').then(m => m.UserHomeModule),
    }, {
        path: 'friends',
        loadChildren: () => import('./friends/friends.module').then(m => m.FriendsModule)
    }]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoggedAreaRoutingModule { }