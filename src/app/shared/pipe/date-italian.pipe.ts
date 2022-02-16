import { Pipe, PipeTransform } from '@angular/core';

enum Days {
  Domenica,
  Lunedì,
  Martedì,
  Mercoledì,
  Giovedì,
  Venerdì,
  Sabato
}

@Pipe({ name: 'italianDate' })
export class DateItalianPipe implements PipeTransform {
  transform(date: Date) {

    const nameOfDay = Days[date.getDay()];

    const result = nameOfDay;

    return result;
  }
}
