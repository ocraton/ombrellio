import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RisorseumaneDetailComponent } from './risorseumane-detail/risorseumane-detail.component';
import { RisorseumaneListComponent } from './risorseumane-list/risorseumane-list.component';
import { RisorseumaneEditComponent } from './risorseumane-edit/risorseumane-edit.component';
import { RisorseumaneDeleteComponent } from './risorseumane-delete/risorseumane-delete.component';
import { RisorseumaneComponent } from './risorseumane.component';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RisorseumaneRoutingModule } from './risorseumane-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RisorseumaneService } from './risorseumane.service';
import { risorseumaneReducer } from './store/risorsaumana.reducers';
import { RisorsaumanaEffects } from './store/risorsaumana.effects';

@NgModule({
  declarations: [
    RisorseumaneComponent,
    RisorseumaneListComponent,
    RisorseumaneDetailComponent, 
    RisorseumaneEditComponent, 
    RisorseumaneDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    RisorseumaneRoutingModule,
    SharedModule,
    StoreModule.forFeature('risorseumane', risorseumaneReducer),
    EffectsModule.forFeature([RisorsaumanaEffects])
  ],
  providers: [RisorseumaneService]
})
export class RisorseumaneModule { }
