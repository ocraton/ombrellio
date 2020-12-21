import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtentiComponent } from './utenti.component';
import { UtentiCreateComponent } from './utenti-create/utenti-create.component';


const routes: Routes = [
  { path: '', component: UtentiComponent },
  { path: 'register', component: UtentiCreateComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class UtentiRoutingModule { }
