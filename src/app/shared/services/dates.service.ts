import { Injectable } from '@angular/core';


@Injectable()

export class DatesService {

    constructor() { }

    dateBuildGMT1(){
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const datebase = `${month}/${day}/${year}`;

      let dateStart = new Date(datebase + " 00:00:00");
      let dateEnd = new Date(datebase + " 23:59:00");

      return {dateStart, dateEnd}
    }

}
