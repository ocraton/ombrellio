import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Prenotazione } from '../prenotazione.model';
import * as fromApp from '../../../store/app.reducer';
import * as PrenotazioniActions from '../store/prenotazioni.actions';
import { Observable } from 'rxjs';
import * as prenotazioniState from '../store/prenotazioni.state';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

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
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.prenotazioniState = this.store.select('prenotazioni');
  }

  cancellaPrenotazione(uid_prenotazione, indexdata){
    this.store.dispatch(PrenotazioniActions.DeletePrenotazione({ uid_prenotazione: uid_prenotazione}));
    this.store.select('prenotazioni').subscribe(res => {
        res.prenotazione.map((c, index) => {
          if (c.id == uid_prenotazione) {
            res.prenotazione.splice(index, 1)
            this.data.prenotazioni.splice(indexdata,1)
          }
        })
    });

  }

  closePrenDetail(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
