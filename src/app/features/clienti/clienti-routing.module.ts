import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientiComponent } from './clienti.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';

const clientiRoutes: Routes = [    
    { path: 'user', component: UserdashboardLayoutComponent, 
      children: [        
        { path: 'clienti', component: ClientiComponent, canActivate: [AuthGuard]},
        { path: 'clienti/new', component: ClienteEditComponent, canActivate: [AuthGuard] },
        { path: 'clienti/:id/edit', component: ClienteEditComponent, canActivate: [AuthGuard] },        
      ]
    }    
  ];

@NgModule({
  imports: [
    RouterModule.forChild(clientiRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class ClientiRoutingModule {}
