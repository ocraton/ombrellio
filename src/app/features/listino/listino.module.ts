import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { ListinoRoutingModule } from './listino-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { ListinoEffects } from './store/listino.effects';
import { ListinoReducer } from './store/listino.reducer';
import { SharedModule } from '../../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { ListinoService } from './listino.service';
import { ListinoComponent } from './listino.component';
import { ListinoEditComponent } from './listino-edit/listino-edit.component';



@NgModule({
  declarations: [
    ListinoComponent,
    ListinoEditComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ListinoRoutingModule,
    SharedModule,
    StoreModule.forFeature('listino', ListinoReducer),
    EffectsModule.forFeature([ListinoEffects])
  ],
  providers: [ListinoService]
})
export class ListinoModule { }
