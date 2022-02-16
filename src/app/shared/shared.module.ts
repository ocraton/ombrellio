import { DateItalianPipe } from './pipe/date-italian.pipe';
import { DatesService } from './services/dates.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from './services/translate.service';
import { CapitalizedTextDirective } from './directive/CapitalizedText.directive';
import { ClockService } from './services/clock.service';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AllergeniService } from './services/allergeni.service';


@NgModule({
  declarations: [
    CapitalizedTextDirective,
    DateItalianPipe
  ],
  imports: [
    CommonModule,
    NgxQRCodeModule
  ],
  exports: [
    CapitalizedTextDirective,
    DateItalianPipe,
    NgxQRCodeModule
  ],
  providers: [TranslateService, DatesService, ClockService, AllergeniService]
})
export class SharedModule { }
