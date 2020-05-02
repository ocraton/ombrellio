import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AziendeComponent } from './aziende.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { AziendaDetailComponent } from './azienda-detail/azienda-detail.component';
import { AziendaEditComponent } from './azienda-edit/azienda-edit.component';

const aziendeRoutes: Routes = [    
    { path: 'user', component: UserdashboardLayoutComponent, 
      children: [        
        { path: 'aziende', component: AziendeComponent, canActivate: [AuthGuard]},
        { path: 'aziende/new', component: AziendaEditComponent, canActivate: [AuthGuard] },
        { path: 'aziende/:id', component: AziendaDetailComponent, canActivate: [AuthGuard] },        
        { path: 'aziende/:id/edit', component: AziendaEditComponent, canActivate: [AuthGuard] },        
      ]
    }    
  ];

@NgModule({
  imports: [
    RouterModule.forChild(aziendeRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AziendeRoutingModule { }
