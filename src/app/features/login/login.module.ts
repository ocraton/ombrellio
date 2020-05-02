import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';

@NgModule({
  declarations: [
    LoginComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialDesignModule,
    LoginRoutingModule,   
  ]
})
export class LoginModule { }
