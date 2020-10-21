import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdottiComponent } from './prodotti.component';
import { SharemenuComponent } from './sharemenu/sharemenu.component';

import { AuthGuard } from '../login/auth-guard.service';

const routes: Routes = [
  { path: '', component: ProdottiComponent, canActivate: [AuthGuard] },
  { path: 'sharemenu', component: SharemenuComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ProdottiRoutingModule { }
