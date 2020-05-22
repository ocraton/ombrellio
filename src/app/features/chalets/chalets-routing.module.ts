import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChaletsComponent } from './chalets.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { ChaletEditComponent } from './chalet-edit/chalet-edit.component';

const chaletsRoutes: Routes = [
  {
    path: 'user', component: UserdashboardLayoutComponent,
    children: [
      { path: 'chalets', component: ChaletsComponent, canActivate: [AuthGuard] },
      { path: 'chalets/new', component: ChaletEditComponent, canActivate: [AuthGuard] },
      { path: 'chalets/:id/edit', component: ChaletEditComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(chaletsRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ChaletsRoutingModule { }
