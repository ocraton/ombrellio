import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdiniComponent } from './ordini.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { OrdineDetailComponent } from './ordine-detail/ordine-detail.component';
import { OrdineListCompletatiComponent } from './ordine-list/ordine-list-completati/ordine-list-completati.component';
import { OrdineListAnnullatiComponent } from './ordine-list/ordine-list-annullati/ordine-list-annullati.component';

const ordiniRoutes: Routes = [
  {
    path: 'user', component: UserdashboardLayoutComponent,
    children: [
      { path: '', component: OrdiniComponent, canActivate: [AuthGuard] },
      { path: 'ordini', component: OrdiniComponent, canActivate: [AuthGuard] },
      { path: 'ordinicompletati', component: OrdineListCompletatiComponent, canActivate: [AuthGuard] },
      { path: 'ordiniannullati', component: OrdineListAnnullatiComponent, canActivate: [AuthGuard] },
      { path: 'ordini/:id', component: OrdineDetailComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ordiniRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class OrdiniRoutingModule { }
