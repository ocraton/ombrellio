import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoginLayoutComponent } from '../../core/components/login-layout/login-layout.component';

const loginRoutes: Routes = [
    {
      path: 'login', component: LoginLayoutComponent,
      children: [
        {path: '', component: LoginComponent}
      ]
    }    
  ];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class LoginRoutingModule {}
