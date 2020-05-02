import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequisitiComponent } from './requisiti.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { RequisitoEditComponent } from './requisito-edit/requisito-edit.component';

const requisitiRoutes: Routes = [    
    { path: 'user', component: UserdashboardLayoutComponent, 
      children: [        
        { path: 'requisiti', component: RequisitiComponent, canActivate: [AuthGuard]},
        { path: 'requisiti/new', component: RequisitoEditComponent, canActivate: [AuthGuard] },
        { path: 'requisiti/:id/edit', component: RequisitoEditComponent, canActivate: [AuthGuard] },        
      ]
    }    
  ];

@NgModule({
  imports: [
    RouterModule.forChild(requisitiRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class RequisitiRoutingModule {}
