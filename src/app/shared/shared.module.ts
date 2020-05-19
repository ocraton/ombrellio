import { DatesService } from './services/dates.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from './services/translate.service';
import { CapitalizedTextDirective } from './directive/CapitalizedText.directive';

const COMPONENTS = [ ];

@NgModule({
  declarations: [CapitalizedTextDirective],
  exports: [CapitalizedTextDirective],
  imports: [
    CommonModule
  ],
  providers: [TranslateService, DatesService]
})
export class SharedModule { }
