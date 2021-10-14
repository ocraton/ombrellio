import { Ombrellone } from './../ombrelloni/ombrellone.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as prenotazioniState from './store/prenotazioni.state';
import * as fromApp from '../../store/app.reducer';
import * as PrenotazioniActions from './store/prenotazioni.actions';
import { SubscriptionService } from '../../core/services/subscription.service';
import { Prenotazione } from './prenotazione.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface Tile {
  iRiga: number;
  iColonna: number;
  ombrellone: Ombrellone;
}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit, OnDestroy {

  prenotazioneState: Observable<prenotazioniState.default>;
  prenArray: Prenotazione[];
  ombrelloniList: Ombrellone[];
  mappaGrid: Tile[] = [];
  public currentValue: string = null;
  valueZoom: number = (localStorage.getItem("zoomLevelPrenotazioni")) ? Number(localStorage.getItem("zoomLevelPrenotazioni")) : 100;
  range = new FormGroup({
    dateStart: new FormControl(new Date(), [Validators.required]),
    dateEnd: new FormControl(new Date(), [Validators.required])
  });

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService) { }

  ngOnInit() {
    if(localStorage.getItem("zoomLevelPrenotazioni")) {this.valueZoom = Number(localStorage.getItem("zoomLevelPrenotazioni"))}
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: this.range.value['dateStart'], endDate: this.range.value['dateEnd']
    }));
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniMappa());
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniOmbrelloni());
    this.prenotazioneState = this.store.select('prenotazioni');
    this.prenotazioneState.subscribe(pren => {
      this.prenArray = pren.prenotazione;
      this.ombrelloniList = pren.ombrellone;
      this.buildGrid(pren.mappa.numero_righe, pren.mappa.numero_colonne)
    })
  }

  buildGrid(numero_righe, numero_colonne) {
    if (this.mappaGrid.length == numero_righe * numero_colonne) {
      this.mappaGrid.splice(0, this.mappaGrid.length)
    }
    for (var i = 1; i <= numero_righe; i++) {
      for (var j = 1; j <= numero_colonne; j++) {
        let ombrel = this.getOmbrelloneIfExist(i, j);
        let tile: Tile = { iRiga: i, iColonna: j, ombrellone: ombrel };
        this.mappaGrid.push(tile);
      }
    }
  }

  getOmbrelloneIfExist(iRiga, iColonna): Ombrellone{
    var ombrellone = this.ombrelloniList.find(obj => {
      return obj.riga == iRiga && obj.colonna == iColonna
    })
    if(ombrellone != null) {
      return { id: ombrellone.id, numero: ombrellone.numero, colonna: ombrellone.colonna, riga: ombrellone.riga }
    } else {
      return null
    }
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

  updateZoom(event) {
    this.valueZoom = event.value;
    localStorage.setItem("zoomLevelPrenotazioni", this.valueZoom.toString());
  }

  getZoomVal() {
    return { zoom: this.valueZoom + '%' }
  }

  formatLabel(value: number) {
    return value + '%';
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }


}

