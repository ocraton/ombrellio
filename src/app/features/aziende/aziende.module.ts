import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AziendeRoutingModule } from './aziende-routing.module';
import { AziendeComponent } from './aziende.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { AziendaListComponent } from './azienda-list/azienda-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AziendaEffects } from './store/azienda.effects';
import { aziendaReducer } from './store/azienda.reducers';
import { AziendeService } from './aziende.service';
import { AziendaDetailComponent } from './azienda-detail/azienda-detail.component';
import { AziendaEditComponent } from './azienda-edit/azienda-edit.component';
import { AziendaDeleteComponent } from './azienda-delete/azienda-delete.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RisorseUmaneComponent } from './components/risorse-umane/risorse-umane.component';
import { DocumentiComponent } from './components/documenti/documenti.component';
import { RisorseumaneListComponent } from '../risorseumane/risorseumane-list/risorseumane-list.component';


@NgModule({
  declarations: [
    AziendeComponent,
    AziendaListComponent,
    AziendaDetailComponent,
    RisorseUmaneComponent,
    DocumentiComponent,
    AziendaDetailComponent,
    AziendaEditComponent,
    AziendaDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    AziendeRoutingModule,
    SharedModule,
    StoreModule.forFeature('aziende', aziendaReducer),
    EffectsModule.forFeature([AziendaEffects])
  ],
  providers: [AziendeService]
})
export class AziendeModule { }
