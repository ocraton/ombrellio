import { MenuService } from './menu.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MaterialDesignModule } from './../../shared/material-design.module';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MaterialDesignModule
  ],
  providers: [MenuService]
})
export class MenuModule { }
