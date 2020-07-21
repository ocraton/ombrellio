import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { CategorieRoutingModule } from './categorie-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieComponent } from './categorie.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from './categoria-delete/categoria-delete.component';
import { EffectsModule } from '@ngrx/effects';
import { CategorieEffects } from './store/categorie.effects';
import { SharedModule } from '../../shared/shared.module';

import { CategorieReducer } from './store/categorie.reducer';
import { StoreModule } from '@ngrx/store';
import { CategorieService } from './categorie.service';


@NgModule({
  declarations: [
    CategorieComponent,
    CategoriaListComponent,
    CategoriaAddComponent,
    CategoriaEditComponent,
    CategoriaDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    CategorieRoutingModule,
    SharedModule,
    StoreModule.forFeature('categorie', CategorieReducer),
    EffectsModule.forFeature([CategorieEffects])
  ],
  providers: [CategorieService]
})
export class CategorieModule { }
