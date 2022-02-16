import { Ombrellone } from './../../ombrelloni/ombrellone.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { DatesService } from 'src/app/shared/services/dates.service';
import * as prenotazioniState from '../store/prenotazioni.state';
import * as fromApp from '../../../store/app.reducer';
import * as PrenotazioniActions from '../store/prenotazioni.actions';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Prenotazione } from '../prenotazione.model';
import { LegendaDialogComponent } from '../legenda-dialog.component';
import { PrenotazioneCreateComponent } from '../prenotazione-create/prenotazione-create.component';


export interface OmbrelloneSelezionato {
  dataInizio: Date;
  dataFine: Date;
  uidOmbrellone: string;
  numeroOmbrellone: string;
}

@Component({
  selector: 'app-prenotazione-intelligente',
  templateUrl: './prenotazione-intelligente.component.html',
  styleUrls: ['./prenotazione-intelligente.component.scss']
})

export class PrenotazioneIntelligenteComponent implements OnInit, OnDestroy {

  prenotazioneState: Observable<prenotazioniState.default>;
  prenArray: Prenotazione[];
  ombrelloniList: Ombrellone[];
  giorni: OmbrelloneSelezionato[] = [];
  soglia = true;
  prenotazioniRangeGiorniOmbrelloni: OmbrelloneSelezionato[] = [];
  rangeDate: Date[];


  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dateservice: DatesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.prenotazioneState = this.store.select('prenotazioni');
    this.prenotazioneState.subscribe(p => {
      this.ombrelloniList = p.ombrellone;
      this.prenArray = p.prenotazione;
      this.rangeDate = [p.dataInizio, p.dataFine];
      this.giorni = this.calcolaRangeGiorni(p.dataInizio, p.dataFine);
    });
  }


  openLegendaDialog() {
    this.dialog.open(LegendaDialogComponent);
  }

  getOmbrelloniDisponibiliFromData(dataSel: Date)  {

    let dataInizio = this.dateservice.dateStartBuildGMT1(dataSel);
    let dataFine = this.dateservice.dateEndBuildGMT1(dataSel);

    let ombrelloniOccuppati: Ombrellone[] = [];

    this.prenArray.forEach((prenotazione) => {

      if (prenotazione.anno_inizio == dataInizio.getFullYear() &&
        prenotazione.anno_fine == dataFine.getFullYear() &&
        prenotazione.data_inizio['seconds'] * 1000 <= dataFine.getTime() &&
        prenotazione.data_fine['seconds'] * 1000 >= dataInizio.getTime()) {
            // Occupati
            ombrelloniOccuppati.push(new Ombrellone(
              prenotazione.uid_ombrellone, prenotazione.numero_ombrellone, 0, 0));
          }
    });

    // Liberi
    let ombrelloniLiberi: Ombrellone[] = [];
    this.ombrelloniList.forEach(ol => {
      let isOccupato = ombrelloniOccuppati.find(oc => ol.id == oc.id);
      if(!isOccupato){
        ombrelloniLiberi.push(ol);
      }
    });
    return ombrelloniLiberi;
  }

  checkTuttiGiorniSelezionati() {
    var sel = this.giorni.filter((g) => g.uidOmbrellone == '');
    if (sel.length == 0) {
      return true;
    } else {
      false;
    }
  }

  setprenotazioniRangeGiorniOmbrelloni() {
    var ombrelRange: OmbrelloneSelezionato[] = [];
    let current = this.giorni[0];

    for (let i = 0; i < this.giorni.length; i++) {
      if (this.giorni[i].uidOmbrellone != current.uidOmbrellone) {
        ombrelRange.push({
          dataInizio: current.dataInizio,
          dataFine: this.giorni[i - 1].dataFine,
          uidOmbrellone: current.uidOmbrellone,
          numeroOmbrellone: current.numeroOmbrellone,
        });
        current = this.giorni[i];
      }
      if (i == this.giorni.length - 1) {
        ombrelRange.push({
          dataInizio: current.dataInizio,
          dataFine: this.giorni[i].dataFine,
          uidOmbrellone: current.uidOmbrellone,
          numeroOmbrellone: current.numeroOmbrellone,
        });
      }
    }

    this.prenotazioniRangeGiorniOmbrelloni = ombrelRange;
  }

  openPrenotaDialog() {
    this.setprenotazioniRangeGiorniOmbrelloni();
    const dataInizio = this.giorni[0].dataInizio;
    const dataFine = this.giorni[this.giorni.length - 1].dataFine;
    this.dialog.open(PrenotazioneCreateComponent, {
      width: '1000px',
      data: {
        prenRangeGiorniOmbrelloni: this.prenotazioniRangeGiorniOmbrelloni,
        prenotazioneSmart: true,
        rangeDate: { dataInizio: dataInizio, dataFine: dataFine},
        numeroGiorniPrenotazione: this.giorni.length
      }
    });
  }


  calcolaRangeGiorni(dataInizio, dataFine) {
    const os: OmbrelloneSelezionato[] = [];
    const theDate = new Date(dataInizio);
    while (theDate <= dataFine) {
      os.push({
        dataInizio: new Date(theDate),
        dataFine: new Date(theDate),
        uidOmbrellone: '',
        numeroOmbrellone: '',
      });
      theDate.setDate(theDate.getDate() + 1);
    }
    return os;
  }

  selezionaOmbrellone(dataSel, ombrellone) {
    this.giorni.find(function (res) {
      if (res.dataInizio.getTime() == dataSel.getTime()) {
        if (res.uidOmbrellone != '' && res.uidOmbrellone == ombrellone.id){
          res.uidOmbrellone = '';
          res.numeroOmbrellone = '';
        } else {
          res.uidOmbrellone = ombrellone.id;
          res.numeroOmbrellone = ombrellone.numero;
        }
      }
    });
  }

  checkDisponibileOG(val) {
    return this.giorni.some(arrVal => val === arrVal.uidOmbrellone);
  }


  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }


}

