import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TavoliComponent } from './tavoli.component';
import { AuthGuard } from '../login/auth-guard.service';
import { TavoliEditComponent } from './tavoli-edit/tavoli-edit.component';
import { TavoliCreateComponent } from './tavoli-create/tavoli-create.component';


const routes: Routes = [
  { path: '', component: TavoliComponent, canActivate: [AuthGuard] },
  { path: 'new', component: TavoliCreateComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: TavoliEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TavoliRoutingModule { }
