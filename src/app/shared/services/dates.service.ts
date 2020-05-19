import { Injectable } from '@angular/core';


@Injectable()

export class DatesService {

    constructor() { }

    dateBuildGMT1(){
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const datebase = `${year}-${month}-${day}`;

      let dateStart = new Date(datebase + ' 00:00:00 GMT+0200');
      let dateEnd = new Date(datebase + ' 23:59:59 GMT+0200');

      return {dateStart, dateEnd}
    }

}
