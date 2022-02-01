import { Component, OnInit, Input } from '@angular/core';

import { PrenotazioneDetailComponent } from './../prenotazione-detail/prenotazione-detail.component';
import { Prenotazione } from '../prenotazione.model';

import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioneCreateComponent } from '../prenotazione-create/prenotazione-create.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-prenotazione-edit',
  templateUrl: './prenotazione-edit.component.html',
  styleUrls: ['./prenotazione-edit.component.scss']
})
export class PrenotazioneEditComponent implements OnInit {

  @Input() ombrellone: Ombrellone;
  @Input() prenArray: Prenotazione[];
  @Input() rangeDate: Date[];
  @Input() ombrellonename: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  openDetailDialog(): void {
    this.dialog.open(PrenotazioneDetailComponent, {
      width: '700px',
      data: {
        prenotazioni: this.prenArray,
        ombrellone: this.ombrellone,
        rangeDateForm: this.rangeDate
      }
    });
  }

  openPrenotaDialog(){
    this.dialog.open(PrenotazioneCreateComponent, {
      width: '1000px',
      data: {
        ombrellone: this.ombrellone,
        rangeDate: this.rangeDate
      }
    });
  }

  getTooltipText() {
    let prenTooltip = '';
    if (this.prenArray.length > 0) {
      this.prenArray.forEach(item => {
        let pagato = item.is_pagato ? 'SI' : 'NO';
        let dataInizio = new Date(item.data_inizio['seconds'] * 1000);
        let dataFine = new Date(item.data_fine['seconds'] * 1000);
        prenTooltip = prenTooltip +
          `${item.nome_cliente.toUpperCase()} ${item.cognome_cliente.toUpperCase()}
        Dal ${dataInizio.getDate()}/${dataInizio.getMonth()+1}/${dataInizio.getFullYear()} al ${dataFine.getDate()}/${dataFine.getMonth() + 1}/${dataFine.getFullYear()}
        Pagato: ${pagato} | Prezzo: ${item.prezzo} € \n
        `;
      })
    }
    return prenTooltip;
  }

}
