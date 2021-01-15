import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrenotazioniComponent } from './prenotazioni.component';



const routes: Routes = [
  { path: '', component: PrenotazioniComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class PrenotazioniRoutingModule { }
