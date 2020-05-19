import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdiniRoutingModule } from './ordini-routing.module';
import { OrdiniComponent } from './ordini.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { OrdineListComponent } from './ordine-list/ordine-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrdineEffects } from './store/ordine.effects';
import { ordineReducer } from './store/ordine.reducers';
import { OrdiniService } from './ordini.service';
import { OrdineDetailComponent } from './ordine-detail/ordine-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdineEditComponent } from './ordine-edit/ordine-edit.component';
import { OrdineListCompletatiComponent } from './ordine-list/ordine-list-completati/ordine-list-completati.component';
import { OrdineListAnnullatiComponent } from './ordine-list/ordine-list-annullati/ordine-list-annullati.component';


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
    StoreModule.forFeature('ordini', ordineReducer),
    EffectsModule.forFeature([OrdineEffects])
  ],
  exports: [
    OrdineListComponent,
    OrdineListCompletatiComponent
  ],
  providers: [OrdiniService]
})
export class OrdiniModule { }
