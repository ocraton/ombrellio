import { DatesService } from './services/dates.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from './services/translate.service';
import { CapitalizedTextDirective } from './directive/CapitalizedText.directive';
import { ClockService } from './services/clock.service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


@NgModule({
  declarations: [CapitalizedTextDirective],
  exports: [CapitalizedTextDirective, NgxQRCodeModule],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  providers: [TranslateService, DatesService, ClockService]
})
export class SharedModule { }
