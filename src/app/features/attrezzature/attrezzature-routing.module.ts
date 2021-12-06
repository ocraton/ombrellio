import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttrezzatureComponent } from './attrezzature.component';


import { AuthGuard } from '../login/auth-guard.service';

const routes: Routes = [
  { path: '', component: AttrezzatureComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AttrezzatureRoutingModule { }
