import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionService } from 'src/app/core/services/subscription.service';


@Component({
  selector: 'detail-prenotazione-dialog',
  templateUrl: './detail-prenotazione-dialog.component.html',
})
export class DetailPrenotazioneDialogComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<DetailPrenotazioneDialogComponent>,
    private subService: SubscriptionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }

  prenotazione: any = null;
  dataInizio: Date;
  dataFine: Date;
  nDataInizio;
  nDataFine;
  ngOnInit() {
    this.prenotazione = this.data.prenotazioneData;
    this.dataInizio = new Date(this.prenotazione.data_inizio.toMillis());
    this.dataFine = new Date(this.prenotazione.data_fine.toMillis());
    this.nDataInizio = this.dataInizio.getDay() + this.dataInizio.getMonth() + this.dataInizio.getFullYear();
    this.nDataFine = this.dataFine.getDay() + this.dataFine.getMonth() + this.dataFine.getFullYear();
  }

  closePrenDetail(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
