import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from './../../shared/material-design.module';
import { ChaletRoutingModule } from './chalet-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaletComponent } from './chalet.component';
import { ChaletListComponent } from './chalet-list/chalet-list.component';
import { ChaletEditComponent } from './chalet-edit/chalet-edit.component';
import { EffectsModule } from '@ngrx/effects';
import { ChaletEffects } from './store/chalet.effects';
import { SharedModule } from '../../shared/shared.module';

import { ChaletReducer } from './store/chalet.reducer';
import { StoreModule } from '@ngrx/store';
import { ChaletsService } from './chalets.service';

@NgModule({
  declarations: [
    ChaletComponent,
    ChaletListComponent,
    ChaletEditComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ChaletRoutingModule,
    SharedModule,
    StoreModule.forFeature('chalet', ChaletReducer),
    EffectsModule.forFeature([ChaletEffects])
  ],
  providers: [ChaletsService]
})
export class ChaletModule { }
