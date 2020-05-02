import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MansioniComponent } from './mansioni.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { MansioneEditComponent } from './mansione-edit/mansione-edit.component';

const mansioniRoutes: Routes = [    
    { path: 'user', component: UserdashboardLayoutComponent, 
      children: [        
        { path: 'mansioni', component: MansioniComponent, canActivate: [AuthGuard]},
        { path: 'mansioni/new', component: MansioneEditComponent, canActivate: [AuthGuard] },
        { path: 'mansioni/:id/edit', component: MansioneEditComponent, canActivate: [AuthGuard] },        
      ]
    }    
  ];

@NgModule({
  imports: [
    RouterModule.forChild(mansioniRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class MansioniRoutingModule {}
