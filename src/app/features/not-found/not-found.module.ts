import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotfoundRoutingModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class NotFoundModule { }
