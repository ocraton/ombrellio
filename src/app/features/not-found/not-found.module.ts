import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './notfound-routing.module';
import { NotFoundComponent } from './not-found.component';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    MaterialDesignModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
