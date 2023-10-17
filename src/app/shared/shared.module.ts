import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/interceptors.interceptor';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModeModalComponent } from './mode-modal/mode-modal.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModeModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, 
    FormsModule, 
    ModalModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
  ],
  // providers vindo do interceptor
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }]
})
export class SharedModule { }
