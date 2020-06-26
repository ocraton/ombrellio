import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdottiComponent } from './prodotti.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { ProdottoEditComponent } from './prodotto-edit/prodotto-edit.component';

const prodottiRoutes: Routes = [
  {
    path: 'user', component: UserdashboardLayoutComponent,
    children: [
      { path: 'prodotti', component: ProdottiComponent, canActivate: [AuthGuard] },
      { path: 'prodotti/new', component: ProdottoEditComponent, canActivate: [AuthGuard] },
      { path: 'prodotti/:id/edit', component: ProdottoEditComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(prodottiRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ProdottiRoutingModule { }
