import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListinoComponent } from './listino.component';
import { AuthGuard } from '../login/auth-guard.service';


const routes: Routes = [
  { path: '', component: ListinoComponent, canActivate: [AuthGuard] },
  { path: 'listino', component: ListinoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ListinoRoutingModule { }
