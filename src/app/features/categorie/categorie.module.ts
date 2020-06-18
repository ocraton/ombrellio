import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorieRoutingModule } from './categorie-routing.module';
import { CategorieComponent } from './categorie.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CategoriaEffects } from './store/categoria.effects';
import { categoriaReducer } from './store/categoria.reducers';
import { CategorieService } from './categorie.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoriaEditComponent } from './categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from './categoria-delete/categoria-delete.component';


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
    StoreModule.forFeature('categorie', categoriaReducer),
    EffectsModule.forFeature([CategoriaEffects])
  ],
  providers: [CategorieService]
})
export class CategorieModule { }
