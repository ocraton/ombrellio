import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MansioniRoutingModule } from './mansioni-routing.module';
import { MansioniComponent } from './mansioni.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { MansioneListComponent } from './mansione-list/mansione-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MansioneEffects } from './store/mansione.effects';
import { mansioneReducer } from './store/mansione.reducers';
import { MansioniService } from './mansioni.service';
import { MansioneDetailComponent } from './mansione-detail/mansione-detail.component';
import { MansioneEditComponent } from './mansione-edit/mansione-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MansioneDeleteComponent } from './mansione-delete/mansione-delete.component';


@NgModule({
  declarations: [
    MansioniComponent,
    MansioneListComponent,
    MansioneDetailComponent,    
    MansioneEditComponent, 
    MansioneDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    MansioniRoutingModule,
    SharedModule,
    StoreModule.forFeature('mansioni', mansioneReducer),
    EffectsModule.forFeature([MansioneEffects])
  ],
  providers: [MansioniService]
})
export class MansioniModule { }
