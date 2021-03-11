import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { OmbrelloniRoutingModule } from './ombrelloni-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OmbrelloniComponent } from './ombrelloni.component';
import { OmbrelloniListComponent } from './ombrelloni-list/ombrelloni-list.component';
import { OmbrelloniEditComponent } from './ombrelloni-edit/ombrelloni-edit.component';
import { OmbrelloniCreateComponent } from './ombrelloni-create/ombrelloni-create.component';
import { EffectsModule } from '@ngrx/effects';
import { OmbrelloniEffects } from './store/ombrelloni.effects';
import { SharedModule } from '../../shared/shared.module';

import { OmbrelloniReducer } from './store/ombrelloni.reducer';
import { StoreModule } from '@ngrx/store';
import { OmbrelloniService } from './ombrelloni.service';
import { OmbrelloniDeleteComponent } from './ombrelloni-delete/ombrelloni-delete.component';
import { FilterOmbrelloniPipe } from './pipe/filter-ombrelloni.pipe';

@NgModule({
  declarations: [
    OmbrelloniComponent,
    OmbrelloniListComponent,
    OmbrelloniEditComponent,
    OmbrelloniDeleteComponent,
    OmbrelloniCreateComponent,
    FilterOmbrelloniPipe
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    OmbrelloniRoutingModule,
    SharedModule,
    StoreModule.forFeature('ombrelloni', OmbrelloniReducer),
    EffectsModule.forFeature([OmbrelloniEffects])
  ],
  providers: [OmbrelloniService]
})
export class OmbrelloniModule { }
