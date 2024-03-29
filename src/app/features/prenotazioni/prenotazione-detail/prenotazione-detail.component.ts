import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Prenotazione } from '../prenotazione.model';
import { PrenotazioneCreateComponent } from '../prenotazione-create/prenotazione-create.component';
import * as fromApp from '../../../store/app.reducer';
import * as PrenotazioniActions from '../store/prenotazioni.actions';
import { Observable } from 'rxjs';
import * as prenotazioniState from '../store/prenotazioni.state';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { PrenotazioneDetailDeleteComponent } from './prenotazione-detail-delete/prenotazione-detail-delete.component';

@Component({
  selector: 'app-prenotazione-detail',
  templateUrl: './prenotazione-detail.component.html',
  styleUrls: ['./prenotazione-detail.component.scss']
})
export class PrenotazioneDetailComponent implements OnInit, OnDestroy {

  prenotazioniState: Observable<prenotazioniState.default>;


  constructor(private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<PrenotazioneDetailComponent>,
    private subService: SubscriptionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.prenotazioniState = this.store.select('prenotazioni');
  }

  openCancellaDialog(uid_prenotazione, indexdata, ombrellone) {
    this.dialog.open(PrenotazioneDetailDeleteComponent, {
      width: '400px',
      data: {
        uid_prenotazione: uid_prenotazione,
        indexdata: indexdata,
        ombrellone: ombrellone,
      }
    });
  }

  openPrenotaDialog(uid_prenotazione, ombrellone, dataInizio, dataFine, data_prenotazione, uid_cliente) {
    this.dialog.open(PrenotazioneCreateComponent, {
      width: '1000px',
      data: {
        idPrenotazione: uid_prenotazione,
        idCliente: uid_cliente,
        ombrellone: ombrellone,
        rangeDate: { 'dataInizio': new Date(dataInizio['seconds'] * 1000), 'dataFine': new Date(dataFine['seconds'] * 1000)},
        rangeDateForm: this.data.rangeDateForm,
        data_prenotazione: data_prenotazione
      }
    });
  }

  closePrenDetail(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
