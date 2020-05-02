import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisitiRoutingModule } from './requisiti-routing.module';
import { RequisitiComponent } from './requisiti.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { RequisitoListComponent } from './requisito-list/requisito-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RequisitoEffects } from './store/requisito.effects';
import { requisitoReducer } from './store/requisito.reducers';
import { RequisitiService } from './requisiti.service';
import { RequisitoDetailComponent } from './requisito-detail/requisito-detail.component';
import { RequisitoEditComponent } from './requisito-edit/requisito-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RequisitoDeleteComponent } from './requisito-delete/requisito-delete.component';


@NgModule({
  declarations: [
    RequisitiComponent,
    RequisitoListComponent,
    RequisitoDetailComponent,    
    RequisitoEditComponent, 
    RequisitoDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    RequisitiRoutingModule,
    SharedModule,
    StoreModule.forFeature('requisiti', requisitoReducer),
    EffectsModule.forFeature([RequisitoEffects])
  ],
  providers: [RequisitiService]
})
export class RequisitiModule { }
