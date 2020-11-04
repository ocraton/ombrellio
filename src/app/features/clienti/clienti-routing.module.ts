import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientiComponent } from './clienti.component';
import { AuthGuard } from '../login/auth-guard.service';
import { ClientiEditComponent } from './clienti-edit/clienti-edit.component';
import { ClientiCreateComponent } from './clienti-create/clienti-create.component';


const routes: Routes = [
  { path: '', component: ClientiComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ClientiCreateComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ClientiEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ClientiRoutingModule { }
