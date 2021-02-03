import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as prenotazioniState from './store/prenotazioni.state';
import * as fromApp from '../../store/app.reducer';
import * as PrenotazioniActions from './store/prenotazioni.actions';
import { SubscriptionService } from '../../core/services/subscription.service';
import { Prenotazione } from './prenotazione.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../clienti/cliente.model';


@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit, OnDestroy {

  prenotazioneState: Observable<prenotazioniState.default>;
  prenArray: Prenotazione[];
  range = new FormGroup({
    dateStart: new FormControl(new Date(), [Validators.required]),
    dateEnd: new FormControl(new Date(), [Validators.required])
  });

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: this.range.value['dateStart'], endDate: this.range.value['dateEnd']
    }));
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniOmbrelloni());
    this.prenotazioneState = this.store.select('prenotazioni');
    this.prenotazioneState.subscribe(pren => {
      this.prenArray = pren.prenotazione
    })
  }

  checkPrenotazione(ombrelloneUid: string) {
    let prenOmbrellone = this.prenArray.filter(obj => {
      return obj.uid_ombrellone == ombrelloneUid
    })
    return prenOmbrellone
  }

  findPrenotazione() {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: this.range.value['dateStart'], endDate: this.range.value['dateEnd']
    }));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }


}

