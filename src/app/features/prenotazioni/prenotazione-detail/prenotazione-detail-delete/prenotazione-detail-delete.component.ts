import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as prenotazioniState from '../../store/prenotazioni.state';
import * as fromApp from '../../../../store/app.reducer';
import * as PrenotazioniActions from '../../store/prenotazioni.actions';
import { Prenotazione } from '../../prenotazione.model';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prenotazioni-list-delete',
  templateUrl: './prenotazione-detail-delete.component.html',
  styleUrls: ['./prenotazione-detail-delete.component.scss']
})
export class PrenotazioneDetailDeleteComponent implements OnInit {

  indexdata: any;
  ombrellone: any;
  uid_prenotazione: string;
  prenotazioni: Prenotazione[];
  prenotazioneState: Observable<prenotazioniState.default>;


  constructor(private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<PrenotazioneDetailDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.uid_prenotazione = data.uid_prenotazione;
    this.indexdata = data.indexdata;
    this.ombrellone = data.ombrellone
  }

  ngOnInit() {
    this.prenotazioneState = this.store.select('prenotazioni');
    this.prenotazioneState.subscribe(pren => {
      this.prenotazioni = pren.prenotazione as Prenotazione[]
    })
  }

  onDelete() {
    this.store.dispatch(PrenotazioniActions.DeletePrenotazione({ uid_prenotazione: this.uid_prenotazione }));
    this.store.select('prenotazioni').subscribe(res => {
      res.prenotazione.map((c, index) => {
        if (c.id == this.uid_prenotazione) {
          res.prenotazione.splice(index, 1)
        }
      })
    });
    this.matDialog.closeAll();
    this.showSuccessMessage(`Prenotazione cancellata!`);
  }


  showSuccessMessage(message: string) {

    let snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

    snackBarRef = this._snackBar.open(message, 'OK', {
      duration: 5000,
      horizontalPosition: 'end'
    });

  }

  close(): void {
    this.matDialog.closeAll();
  }

}
