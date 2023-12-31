import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SavedComponent } from './saved.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomPipesModule } from 'src/app/shared/custom-pipes/custom-pipes.module';


@NgModule({
  declarations: [
    SavedComponent,
  ],
  imports: [
    CommonModule,
    SavedRoutingModule, 
    CustomPipesModule,
    FormsModule,
    SharedModule
  ]
})
export class SavedModule { }
