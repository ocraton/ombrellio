import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AttrezzatureComponent } from './attrezzature.component';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { AttrezzaturaEditComponent } from './attrezzatura-edit/attrezzatura-edit.component';

const attrezzatureRoutes: Routes = [    
    { path: 'user', component: UserdashboardLayoutComponent, 
      children: [        
        { path: 'attrezzature', component: AttrezzatureComponent, canActivate: [AuthGuard]},
        { path: 'attrezzature/new', component: AttrezzaturaEditComponent, canActivate: [AuthGuard] },
        { path: 'attrezzature/:id/edit', component: AttrezzaturaEditComponent, canActivate: [AuthGuard] },        
      ]
    }    
  ];

@NgModule({
  imports: [
    RouterModule.forChild(attrezzatureRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AttrezzatureRoutingModule {}
