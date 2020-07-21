import { OrdineListComponent } from './ordine-list/ordine-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from './../../shared/material-design.module';
import { OrdiniRoutingModule } from './ordini-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdiniComponent } from './ordini.component';
import { EffectsModule } from '@ngrx/effects';
import { OrdiniEffects } from './store/ordini.effects';
import { SharedModule } from '../../shared/shared.module';

import { OrdiniReducer } from './store/ordini.reducer';
import { StoreModule } from '@ngrx/store';
import { OrdiniService } from './ordini.service';
import { OrdineListCompletatiComponent } from './ordine-list/ordine-list-completati/ordine-list-completati.component';
import { OrdineListAnnullatiComponent } from './ordine-list/ordine-list-annullati/ordine-list-annullati.component';
import { OrdineDetailComponent } from './ordine-detail/ordine-detail.component';
import { OrdineEditComponent } from './ordine-edit/ordine-edit.component';

@NgModule({
  declarations: [
    OrdiniComponent,
    OrdineListComponent,
    OrdineListCompletatiComponent,
    OrdineListAnnullatiComponent,
    OrdineDetailComponent,
    OrdineEditComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    OrdiniRoutingModule,
    SharedModule,
    StoreModule.forFeature('ordini', OrdiniReducer),
    EffectsModule.forFeature([OrdiniEffects])
  ],
  providers: [OrdiniService]
})
export class OrdiniModule { }
