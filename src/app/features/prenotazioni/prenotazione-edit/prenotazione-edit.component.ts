import { Component, OnInit, Input } from '@angular/core';

import { PrenotazioneDetailComponent } from './../prenotazione-detail/prenotazione-detail.component';
import { Prenotazione } from '../prenotazione.model';

import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { MatDialog } from '@angular/material/dialog';
import { PrenotazioneCreateComponent } from '../prenotazione-create/prenotazione-create.component';

@Component({
  selector: 'app-prenotazione-edit',
  templateUrl: './prenotazione-edit.component.html',
  styleUrls: ['./prenotazione-edit.component.scss']
})
export class PrenotazioneEditComponent implements OnInit {

  @Input() ombrellone: Ombrellone;
  @Input() prenArray: Prenotazione[];
  @Input() rangeDate: Date[];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {}

  openDetailDialog(): void {
    this.dialog.open(PrenotazioneDetailComponent, {
      width: '700px',
      data: { prenotazioni: this.prenArray, ombrellone: this.ombrellone}
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



}
