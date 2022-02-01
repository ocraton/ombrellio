import { FormsModule } from '@angular/forms';
import { MaterialDesignModule } from './../../shared/material-design.module';
import { LoginRoutingModule } from './login-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ServizioScadutoComponent } from './servizio-scaduto/servizio-scaduto.component';
import { ResetConfirmComponent } from './reset-confirm/reset-confirm.component';



@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetConfirmComponent,
    ServizioScadutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    MaterialDesignModule
  ]
})
export class LoginModule { }
