import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashboardLayoutComponent } from 'src/app/core/components/userdashboard-layout/userdashboard-layout.component';
import { AuthGuard } from '../login/auth-guard.service';
import { RisorseumaneEditComponent } from './risorseumane-edit/risorseumane-edit.component';
import { RisorseumaneComponent } from './risorseumane.component';


const risorseumaneRoutes: Routes = [    
  { path: 'user', component: UserdashboardLayoutComponent, 
    children: [        
      { path: 'risorseumane', component: RisorseumaneComponent, canActivate: [AuthGuard]},
      { path: 'risorseumane/new', component: RisorseumaneEditComponent, canActivate: [AuthGuard] },
      { path: 'risorseumane/:id/edit', component: RisorseumaneEditComponent, canActivate: [AuthGuard] },        
    ]
  }    
];

@NgModule({
imports: [
  RouterModule.forChild(risorseumaneRoutes)
],
exports: [RouterModule],
providers: [AuthGuard]
})
export class RisorseumaneRoutingModule { }
