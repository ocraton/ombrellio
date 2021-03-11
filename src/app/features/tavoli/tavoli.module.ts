import { FilterTavoliPipe } from './pipe/filter-tavoli.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { TavoliRoutingModule } from './tavoli-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TavoliComponent } from './tavoli.component';
import { TavoliListComponent } from './tavoli-list/tavoli-list.component';
import { TavoliEditComponent } from './tavoli-edit/tavoli-edit.component';
import { TavoliCreateComponent } from './tavoli-create/tavoli-create.component';
import { EffectsModule } from '@ngrx/effects';
import { TavoliEffects } from './store/tavoli.effects';
import { SharedModule } from '../../shared/shared.module';

import { TavoliReducer } from './store/tavoli.reducer';
import { StoreModule } from '@ngrx/store';
import { TavoliService } from './tavoli.service';
import { TavoliDeleteComponent } from './tavoli-delete/tavoli-delete.component';

@NgModule({
  declarations: [
    TavoliComponent,
    TavoliListComponent,
    TavoliEditComponent,
    TavoliDeleteComponent,
    TavoliCreateComponent,
    FilterTavoliPipe
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    TavoliRoutingModule,
    SharedModule,
    StoreModule.forFeature('tavoli', TavoliReducer),
    EffectsModule.forFeature([TavoliEffects])
  ],
  providers: [TavoliService]
})
export class TavoliModule { }
