import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsLoggedInGuard } from './shared/guards/is-logged/is-logged-in.guard';
import { NotLoggedInGuard } from './shared/guards/not-logged-in/not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./logged-area/logged-area.module').then(m => m.LoggedAreaModule),
    canActivate: [IsLoggedInGuard],
  }, {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [NotLoggedInGuard],
  }, {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
