import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OmbrelloniComponent } from './ombrelloni.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { OmbrelloneDetailComponent } from './ombrellone-detail/ombrellone-detail.component';

const ombrelloniRoutes: Routes = [
  {
    path: 'user', component: UserdashboardLayoutComponent,
    children: [
      { path: 'ombrelloni', component: OmbrelloniComponent, canActivate: [AuthGuard] },
      { path: 'ombrelloni/:id', component: OmbrelloneDetailComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(ombrelloniRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class OmbrelloniRoutingModule { }
