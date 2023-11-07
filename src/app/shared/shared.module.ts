import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/interceptors.interceptor';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModeModalComponent } from './mode-modal/mode-modal.component';
import { LeftRoutingComponent } from './components/left-routing/left-routing.component';
import { CreatePostComponent } from './components/create-post/create-post.component';


@NgModule({
  declarations: [
    HeaderComponent,
    ModeModalComponent,
    LeftRoutingComponent,
    CreatePostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule, 
    ModalModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    LeftRoutingComponent
  ],
  // providers vindo do interceptor
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }]
})
export class SharedModule { }
