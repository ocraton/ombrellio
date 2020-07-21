import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdiniComponent } from './ordini.component';
import { OrdineListCompletatiComponent } from './ordine-list/ordine-list-completati/ordine-list-completati.component';
import { OrdineListAnnullatiComponent } from './ordine-list/ordine-list-annullati/ordine-list-annullati.component';
import { OrdineDetailComponent } from './ordine-detail/ordine-detail.component';

import { AuthGuard } from '../login/auth-guard.service';

const routes: Routes = [
  { path: '', component: OrdiniComponent, canActivate: [AuthGuard] },
  { path: 'completati', component: OrdineListCompletatiComponent, canActivate: [AuthGuard] },
  { path: 'annullati', component: OrdineListAnnullatiComponent, canActivate: [AuthGuard] },
  { path: 'ordini/:id', component: OrdineDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class OrdiniRoutingModule { }
