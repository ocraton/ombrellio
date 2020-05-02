import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientiRoutingModule } from './clienti-routing.module';
import { ClientiComponent } from './clienti.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClienteEffects } from './store/cliente.effects';
import { clienteReducer } from './store/cliente.reducers';
import { ClientiService } from './clienti.service';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteDeleteComponent } from './cliente-delete/cliente-delete.component';


@NgModule({
  declarations: [
    ClientiComponent,
    ClienteListComponent,
    ClienteDetailComponent,    
    ClienteEditComponent, 
    ClienteDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    ReactiveFormsModule,
    ClientiRoutingModule,
    SharedModule,
    StoreModule.forFeature('clienti', clienteReducer),
    EffectsModule.forFeature([ClienteEffects])
  ],
  providers: [ClientiService]
})
export class ClientiModule { }
