import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrenotazioniComponent } from './prenotazioni.component';
import { PrenotazioniListComponent } from './prenotazione-list/prenotazioni-list.component';
import { AuthGuard } from '../login/auth-guard.service';


const routes: Routes = [
  { path: '', component: PrenotazioniComponent, canActivate: [AuthGuard] },
  { path: 'prenotazionilist', component: PrenotazioniListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PrenotazioniRoutingModule { }
