import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';


@Injectable()

export class TranslateService {

    constructor(private paginatorIntl: MatPaginatorIntl) { }

    translatePaginatorLabels() {
        this.paginatorIntl.nextPageLabel = 'Avanti';
        this.paginatorIntl.previousPageLabel = 'Indietro';
        this.paginatorIntl.firstPageLabel = 'Prima';
        this.paginatorIntl.lastPageLabel = 'Ultima';
        this.paginatorIntl.itemsPerPageLabel = 'Righe per pagina';
        this.paginatorIntl.getRangeLabel = function(page, pageSize, length) {
          if (length === 0 || pageSize === 0) { return '0 di ' + length; }
          length = Math.max(length, 0);
          let startIndex = page * pageSize;                            
          let endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) : startIndex + pageSize;          
          return startIndex + ' - ' + endIndex + ' di ' + length;
        };
      }
}