import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttrezzatureRoutingModule } from './attrezzature-routing.module';
import { AttrezzatureComponent } from './attrezzature.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { AttrezzaturaListComponent } from './attrezzatura-list/attrezzatura-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AttrezzaturaEffects } from './store/attrezzatura.effects';
import { attrezzaturaReducer } from './store/attrezzatura.reducers';
import { AttrezzatureService } from './attrezzature.service';
import { AttrezzaturaDetailComponent } from './attrezzatura-detail/attrezzatura-detail.component';
import { AttrezzaturaEditComponent } from './attrezzatura-edit/attrezzatura-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AttrezzaturaDeleteComponent } from './attrezzatura-delete/attrezzatura-delete.component';


@NgModule({
  declarations: [
    AttrezzatureComponent,
    AttrezzaturaListComponent,
    AttrezzaturaDetailComponent,    
    AttrezzaturaEditComponent, 
    AttrezzaturaDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    AttrezzatureRoutingModule,
    SharedModule,
    StoreModule.forFeature('attrezzature', attrezzaturaReducer),
    EffectsModule.forFeature([AttrezzaturaEffects])
  ],
  providers: [AttrezzatureService]
})
export class AttrezzatureModule { }
