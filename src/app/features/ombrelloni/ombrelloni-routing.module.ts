import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OmbrelloniComponent } from './ombrelloni.component';
import { AuthGuard } from '../login/auth-guard.service';
import { OmbrelloniEditComponent } from './ombrelloni-edit/ombrelloni-edit.component';
import { OmbrelloniCreateComponent } from './ombrelloni-create/ombrelloni-create.component';


const routes: Routes = [
  { path: '', component: OmbrelloniComponent, canActivate: [AuthGuard] },
  { path: 'new', component: OmbrelloniCreateComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: OmbrelloniEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class OmbrelloniRoutingModule { }
