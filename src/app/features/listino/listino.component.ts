import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Ombrellone } from './../ombrelloni/ombrellone.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import * as listinoState from './store/listino.state';
import * as fromApp from '../../store/app.reducer';
import * as ListinoActions from './store/listino.actions';
import { SubscriptionService } from '../../core/services/subscription.service';
import { Listino } from './listino.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Tile {
  iRiga: number;
  iColonna: number;
  ombrellone: Ombrellone;
}

enum Mesi {
  Gennaio,
  Febbraio,
  Marzo,
  Aprile,
  Maggio,
  Giugno,
  Luglio,
  Agosto,
  Settembre,
  Ottobre,
  Novembre,
  Dicembre
}

@Component({
  selector: 'app-listino',
  templateUrl: './listino.component.html',
  styleUrls: ['./listino.component.scss']
})
export class ListinoComponent implements OnInit, OnDestroy {

  listinoState: Observable<listinoState.default>;


  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(ListinoActions.FetchListino());
    this.listinoState = this.store.select('listino');
  }

  getMese(numeroMese: number){
    return Mesi[numeroMese].toString();
  }


  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

