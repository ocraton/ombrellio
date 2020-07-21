import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { ProdottiRoutingModule } from './prodotti-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdottiComponent } from './prodotti.component';
import { ProdottoListComponent } from './prodotto-list/prodotto-list.component';
import { ProdottoAddComponent } from './prodotto-add/prodotto-add.component';
import { ProdottoEditComponent } from './prodotto-edit/prodotto-edit.component';
import { ProdottoDeleteComponent } from './prodotto-delete/prodotto-delete.component';
import { EffectsModule } from '@ngrx/effects';
import { ProdottiEffects } from './store/prodotti.effects';
import { SharedModule } from '../../shared/shared.module';

import { ProdottiReducer } from './store/prodotti.reducer';
import { StoreModule } from '@ngrx/store';
import { ProdottiService } from './prodotti.service';


@NgModule({
  declarations: [
    ProdottiComponent,
    ProdottoListComponent,
    ProdottoAddComponent,
    ProdottoEditComponent,
    ProdottoDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ProdottiRoutingModule,
    SharedModule,
    StoreModule.forFeature('prodotti', ProdottiReducer),
    EffectsModule.forFeature([ProdottiEffects])
  ],
  providers: [ProdottiService]
})
export class ProdottiModule { }
