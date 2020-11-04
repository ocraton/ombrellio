import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { ClientiRoutingModule } from './clienti-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientiComponent } from './clienti.component';
import { ClientiListComponent } from './clienti-list/clienti-list.component';
import { ClientiEditComponent } from './clienti-edit/clienti-edit.component';
import { ClientiCreateComponent } from './clienti-create/clienti-create.component';
import { EffectsModule } from '@ngrx/effects';
import { ClientiEffects } from './store/clienti.effects';
import { SharedModule } from '../../shared/shared.module';

import { ClientiReducer } from './store/clienti.reducer';
import { StoreModule } from '@ngrx/store';
import { ClientiService } from './clienti.service';
import { ClientiDeleteComponent } from './clienti-delete/clienti-delete.component';

@NgModule({
  declarations: [
    ClientiComponent,
    ClientiListComponent,
    ClientiEditComponent,
    ClientiDeleteComponent,
    ClientiCreateComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ClientiRoutingModule,
    SharedModule,
    StoreModule.forFeature('clienti', ClientiReducer),
    EffectsModule.forFeature([ClientiEffects])
  ],
  providers: [ClientiService]
})
export class ClientiModule { }
