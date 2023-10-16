import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoggedAreaComponent } from './logged-area.component';
import { LoggedAreaRoutingModule } from './logged-area-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';


@NgModule({
  declarations: [
    LoggedAreaComponent,
  ],
  imports: [
    CommonModule,
    LoggedAreaRoutingModule,
    SharedModule,
  ]
})
export class LoggedAreaModule { }
