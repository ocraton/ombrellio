import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaletsRoutingModule } from './chalets-routing.module';
import { ChaletsComponent } from './chalets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { ChaletListComponent } from './chalet-list/chalet-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChaletEffects } from './store/chalet.effects';
import { chaletReducer } from './store/chalet.reducers';
import { ChaletsService } from './chalets.service';
import { ChaletDetailComponent } from './chalet-detail/chalet-detail.component';
import { ChaletEditComponent } from './chalet-edit/chalet-edit.component';
import { ChaletDeleteComponent } from './chalet-delete/chalet-delete.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChaletsComponent,
    ChaletListComponent,
    ChaletDetailComponent,
    ChaletDetailComponent,
    ChaletEditComponent,
    ChaletDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ChaletsRoutingModule,
    SharedModule,
    StoreModule.forFeature('chalets', chaletReducer),
    EffectsModule.forFeature([ChaletEffects])
  ],
  providers: [ChaletsService]
})
export class ChaletsModule { }
