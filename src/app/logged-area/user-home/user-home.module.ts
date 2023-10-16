import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home.component';
import { UserHomeRoutingModule } from './user-home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomPipesModule } from 'src/app/shared/custom-pipes/custom-pipes.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserHomeComponent
  ],
  imports: [
    CommonModule, 
    UserHomeRoutingModule, 
    FormsModule,
    SharedModule, 
    CustomPipesModule
  ]
})
export class UserHomeModule { }
