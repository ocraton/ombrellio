import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategorieComponent } from './categorie.component';


import { AuthGuard } from '../login/auth-guard.service';

const routes: Routes = [
  { path: '', component: CategorieComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CategorieRoutingModule { }
