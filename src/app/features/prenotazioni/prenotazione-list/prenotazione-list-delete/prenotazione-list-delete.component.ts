import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as prenotazioniState from '../../store/prenotazioni.state';
import * as fromApp from '../../../../store/app.reducer';
import * as PrenotazioniActions from '../../store/prenotazioni.actions';
import { Prenotazione } from '../../prenotazione.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrenotazioniListComponent } from '../prenotazioni-list.component';

@Component({
  selector: 'app-prenotazioni-list-delete',
  templateUrl: './prenotazione-list-delete.component.html',
  styleUrls: ['./prenotazione-list-delete.component.scss']
})
export class PrenotazioneListDeleteComponent implements OnInit {

  numero_ombrellone: string;
  uid_prenotazione: string;
  prenotazioni: Prenotazione[];
  prenotazioneState: Observable<prenotazioniState.default>;


  constructor(private store: Store<fromApp.AppState>,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PrenotazioniListComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.uid_prenotazione = data.uidPrenotazione;
    this.numero_ombrellone = data.numberoOmbrellone;
  }

  ngOnInit() {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniLista());
    this.prenotazioneState = this.store.select('prenotazioni');
    this.prenotazioneState.subscribe(pren => {
      this.prenotazioni = pren.prenotazione as Prenotazione[]
    })
  }

  onDelete() {
    this.store.dispatch(PrenotazioniActions.DeletePrenotazione({ uid_prenotazione: this.uid_prenotazione}));
    this.prenotazioni.map((c, index) => {
      if (c.id == this.uid_prenotazione) {
        this.prenotazioni.splice(index, 1);
      }
    }
    )
    this.dialogRef.close();
    this.showSuccessMessage(`Prenotazione Ombrellone ${this.numero_ombrellone} cancellato!`);
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
    this.dialogRef.close();
  }

}
