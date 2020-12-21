import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { UtentiRoutingModule } from './utenti-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtentiComponent } from './utenti.component';
import { UtentiCreateComponent } from './utenti-create/utenti-create.component';
import { EffectsModule } from '@ngrx/effects';
import { UtentiEffects } from './store/utenti.effects';
import { SharedModule } from '../../shared/shared.module';

import { UtentiReducer } from './store/utenti.reducer';
import { StoreModule } from '@ngrx/store';
import { UtentiService } from './utenti.service';


@NgModule({
  declarations: [
    UtentiComponent,
    UtentiCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    UtentiRoutingModule,
    SharedModule,
    StoreModule.forFeature('utenti', UtentiReducer),
    EffectsModule.forFeature([UtentiEffects])
  ],
  providers: [UtentiService]
})
export class UtentiModule { }
