import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { AttrezzatureRoutingModule } from './attrezzature-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttrezzatureComponent } from './attrezzature.component';
import { AttrezzaturaListComponent } from './attrezzatura-list/attrezzatura-list.component';
import { AttrezzaturaAddComponent } from './attrezzatura-add/attrezzatura-add.component';
import { AttrezzaturaEditComponent } from './attrezzatura-edit/attrezzatura-edit.component';
import { AttrezzaturaDeleteComponent } from './attrezzatura-delete/attrezzatura-delete.component';
import { EffectsModule } from '@ngrx/effects';
import { AttrezzatureEffects } from './store/attrezzature.effects';
import { SharedModule } from '../../shared/shared.module';

import { AttrezzatureReducer } from './store/attrezzature.reducer';
import { StoreModule } from '@ngrx/store';
import { AttrezzatureService } from './attrezzature.service';


@NgModule({
  declarations: [
    AttrezzatureComponent,
    AttrezzaturaListComponent,
    AttrezzaturaAddComponent,
    AttrezzaturaEditComponent,
    AttrezzaturaDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    AttrezzatureRoutingModule,
    SharedModule,
    StoreModule.forFeature('attrezzature', AttrezzatureReducer),
    EffectsModule.forFeature([AttrezzatureEffects])
  ],
  providers: [AttrezzatureService]
})
export class AttrezzatureModule { }
