import { Component, OnInit, OnDestroy, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import * as prenotazioniState from '../store/prenotazioni.state';
import * as fromApp from '../../../store/app.reducer';
import * as PrenotazioniActions from '../store/prenotazioni.actions';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Prenotazione } from '../prenotazione.model';
import { PrenotazioneCreateComponent } from '../prenotazione-create/prenotazione-create.component';


export interface Tile {
  iRiga: number;
  iColonna: number;
  ombrellone: Ombrellone;
}

@Component({
  selector: 'app-prenotazione',
  templateUrl: './prenotazioni-list.component.html',
  styleUrls: ['./prenotazioni-list.component.scss']
})
export class PrenotazioniListComponent implements OnInit, OnDestroy {

  prenotazioneState: Observable<prenotazioniState.default>;
  displayedColumns: string[] = ['ombrellone', 'data_inizio', 'data_fine', 'nome_cliente', 'cognome_cliente', 'data_prenotazione', 'is_pagato', 'action'];
  dataSource = new MatTableDataSource<Prenotazione>();

  @ViewChild(MatSort, { static: false })

  set sort(v: MatSort) {
    this.dataSource.sort = v;
  }

  @ViewChild(MatPaginator, { static: false })
  set paginator(v: MatPaginator) {
    this.dataSource.paginator = v;
  }

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniLista());
    this.prenotazioneState = this.store.select('prenotazioni');
    this.prenotazioneState.subscribe(pren => {
      this.dataSource.data = pren.prenotazione as Prenotazione[]
    })
  }

  cancellaPrenotazione(uid_prenotazione) {
    this.store.dispatch(PrenotazioniActions.DeletePrenotazione({ uid_prenotazione: uid_prenotazione }));
  }

  openPrenotaDialog(uid_prenotazione, uid_ombrellone, numero_ombrellone, dataInizio, dataFine, dataPrenotazione, uid_cliente) {
    var ombrellone: Ombrellone = {id: uid_ombrellone, numero: numero_ombrellone, riga: null, colonna: null }
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '1000px';
    dialogConfigDel.data = {
      idPrenotazione: uid_prenotazione,
      idCliente: uid_cliente,
      ombrellone: ombrellone,
      rangeDate: { 'dataInizio': new Date(dataInizio['seconds'] * 1000), 'dataFine': new Date(dataFine['seconds'] * 1000) },
      data_prenotazione: dataPrenotazione,
      editFromListView: true
    };
    this.dialog.open(PrenotazioneCreateComponent, dialogConfigDel);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }


}

