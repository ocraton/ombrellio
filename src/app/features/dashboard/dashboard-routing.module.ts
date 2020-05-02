import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';

const dashboardRoutes: Routes = [    
    { path: 'user', component: UserdashboardLayoutComponent, 
      children: [
        { path: '', component: DashboardComponent, canActivate: [AuthGuard]},
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      ]
    }     
  ];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class DashboardRoutingModule {}
