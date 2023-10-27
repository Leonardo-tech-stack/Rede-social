import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsComponent } from './friends.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule, 
    FormsModule,
    SharedModule
  ]
})
export class FriendsModule { }
