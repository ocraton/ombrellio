import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MaterialDesignModule } from 'src/app/shared/material-design.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    DashboardRoutingModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
