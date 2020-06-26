import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdottiRoutingModule } from './prodotti-routing.module';
import { ProdottiComponent } from './prodotti.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { ProdottoListComponent } from './prodotto-list/prodotto-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProdottoEffects } from './store/prodotto.effects';
import { prodottoReducer } from './store/prodotto.reducers';
import { ProdottiService } from './prodotti.service';
import { ProdottoEditComponent } from './prodotto-edit/prodotto-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdottoDeleteComponent } from './prodotto-delete/prodotto-delete.component';
import { ProdottoAddComponent } from './prodotto-add/prodotto-add.component';


@NgModule({
  declarations: [
    ProdottiComponent,
    ProdottoListComponent,
    ProdottoEditComponent,
    ProdottoDeleteComponent,
    ProdottoAddComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ProdottiRoutingModule,
    SharedModule,
    StoreModule.forFeature('prodotti', prodottoReducer),
    EffectsModule.forFeature([ProdottoEffects])
  ],
  providers: [ProdottiService]
})
export class ProdottiModule { }
