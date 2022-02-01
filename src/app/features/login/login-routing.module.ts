import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login.component';
import { ResetConfirmComponent } from './reset-confirm/reset-confirm.component';
import { ServizioScadutoComponent } from './servizio-scaduto/servizio-scaduto.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetconfirm', component: ResetConfirmComponent },
  { path: 'servizioscaduto', component: ServizioScadutoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
