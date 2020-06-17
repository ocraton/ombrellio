import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieComponent } from './categorie.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';

const categorieRoutes: Routes = [
  {
    path: 'user', component: UserdashboardLayoutComponent,
    children: [
      { path: 'categorie', component: CategorieComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(categorieRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class CategorieRoutingModule { }
