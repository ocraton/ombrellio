import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

const notfoundRoutes: Routes = [
    { path: 'not-found', component: NotFoundComponent},        
  ];

@NgModule({
  imports: [
    RouterModule.forChild(notfoundRoutes)
  ],
  exports: [RouterModule],
  providers: []
})

export class NotfoundRoutingModule {}
