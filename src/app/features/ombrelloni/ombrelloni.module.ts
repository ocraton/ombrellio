import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmbrelloniRoutingModule } from './ombrelloni-routing.module';
import { OmbrelloniComponent } from './ombrelloni.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { OmbrelloneListComponent } from './ombrellone-list/ombrellone-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OmbrelloneEffects } from './store/ombrellone.effects';
import { ombrelloneReducer } from './store/ombrellone.reducers';
import { OmbrelloniService } from './ombrelloni.service';
import { OmbrelloneDetailComponent } from './ombrellone-detail/ombrellone-detail.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OmbrelloniComponent,
    OmbrelloneListComponent,
    OmbrelloneDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    OmbrelloniRoutingModule,
    SharedModule,
    StoreModule.forFeature('ombrelloni', ombrelloneReducer),
    EffectsModule.forFeature([OmbrelloneEffects])
  ],
  exports: [
    OmbrelloneListComponent
  ],
  providers: [OmbrelloniService]
})
export class OmbrelloniModule { }
