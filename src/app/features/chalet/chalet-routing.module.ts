import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaletComponent } from './chalet.component';
import { AuthGuard } from '../login/auth-guard.service';
import { ChaletEditComponent } from './chalet-edit/chalet-edit.component';


const routes: Routes = [
  { path: '', component: ChaletComponent, canActivate: [AuthGuard] },
  { path: 'new', component: ChaletEditComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: ChaletEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ChaletRoutingModule { }
