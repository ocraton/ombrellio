import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from './../../shared/material-design.module';
import { PrenotazioniRoutingModule } from './prenotazioni-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { PrenotazioniEffects } from './store/prenotazioni.effects';
import { PrenotazioniReducer } from './store/prenotazioni.reducer';
import { SharedModule } from '../../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { PrenotazioniService } from './prenotazioni.service';
import { PrenotazioniComponent } from './prenotazioni.component';
import { LegendaDialogComponent } from './legenda-dialog.component';
import { PrenotazioneEditComponent } from './prenotazione-edit/prenotazione-edit.component';
import { PrenotazioneDetailComponent } from './prenotazione-detail/prenotazione-detail.component';
import { PrenotazioneCreateComponent } from './prenotazione-create/prenotazione-create.component';
import { PrenotazioneClienteCreateComponent } from './prenotazione-cliente-create/prenotazione-cliente-create.component';
import { PrenotazioniListComponent } from './prenotazione-list/prenotazioni-list.component';
import { DetailPrenotazioneDialogComponent } from './prenotazione-list/detail-prenotazione-dialog.component';
import { PrenotazioneListDeleteComponent } from './prenotazione-list/prenotazione-list-delete/prenotazione-list-delete.component';
import { PrenotazioneDetailDeleteComponent } from './prenotazione-detail/prenotazione-detail-delete/prenotazione-detail-delete.component';
import { PrenotazioneIntelligenteComponent } from './prenotazione-intelligente/prenotazione-intelligente.component';


@NgModule({
  declarations: [
    PrenotazioniComponent,
    PrenotazioniListComponent,
    PrenotazioneEditComponent,
    PrenotazioneDetailComponent,
    PrenotazioneCreateComponent,
    PrenotazioneClienteCreateComponent,
    PrenotazioneListDeleteComponent,
    PrenotazioneDetailDeleteComponent,
    PrenotazioneIntelligenteComponent,
    LegendaDialogComponent,
    DetailPrenotazioneDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    PrenotazioniRoutingModule,
    SharedModule,
    StoreModule.forFeature('prenotazioni', PrenotazioniReducer),
    EffectsModule.forFeature([PrenotazioniEffects])
  ],
  providers: [PrenotazioniService]
})
export class PrenotazioniModule { }
