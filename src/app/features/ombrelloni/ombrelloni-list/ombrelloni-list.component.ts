import { OmbrelloniCreateComponent } from './../ombrelloni-create/ombrelloni-create.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as ombrelloniState from '../store/ombrelloni.state';
import * as fromApp from '../../../store/app.reducer';

import * as OmbrelloniActions from '../store/ombrelloni.actions';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ombrellone } from '../ombrellone.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { OmbrelloniEditComponent } from '../ombrelloni-edit/ombrelloni-edit.component';
import { OmbrelloniDeleteComponent } from '../ombrelloni-delete/ombrelloni-delete.component';

export interface Tile {
  iRiga: number;
  iColonna: number;
  ombrellone: Ombrellone;
}

@Component({
  selector: 'app-ombrelloni-list',
  templateUrl: './ombrelloni-list.component.html',
  styleUrls: ['./ombrelloni-list.component.scss']
})
export class OmbrelloniListComponent implements OnInit, OnDestroy {

  ombrelloniState: Observable<ombrelloniState.default>;
  ombrelloni: Ombrellone[] = null;
  ombrelloniSearched: Ombrellone[] = null;
  ombrellonename: string = "";
  mappaGrid: Tile[] = [];
  matGridListRowHeight = 130;
  matGridListCellWidth = 150;
  valueZoom: number = (localStorage.getItem("zoomLevelOmbrelloniGrid")) ? Number(localStorage.getItem("zoomLevelOmbrelloniGrid")) : 100;

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initZoomLevel();
    this.store.dispatch(OmbrelloniActions.FetchOmbrelloni());
    this.store.dispatch(OmbrelloniActions.FetchOmbrelloniMappa());
    this.ombrelloniState = this.store.select('ombrelloni');
    this.ombrelloniState.subscribe(res => {
      this.ombrelloni = res.ombrelloni as Ombrellone[]
      this.buildGrid(res.mappa.numero_righe, res.mappa.numero_colonne)
    })
  }

  dropOmbrellone(event: CdkDragDrop<string[]>, tile: Tile) {
    var ombrelloneOrigine: Ombrellone = this.ombrelloni.find(res => {
      return res.colonna == event.item.data.colonna && res.riga == event.item.data.riga
    });
    var ombrelloneDestinazione: Ombrellone = this.ombrelloni.find(res => {
      return res.colonna == tile.iColonna && res.riga == tile.iRiga
    });
    if (!ombrelloneDestinazione){
      ombrelloneOrigine.riga = tile.iRiga;
      ombrelloneOrigine.colonna = tile.iColonna;
    } else {
      let rigaOrigine = ombrelloneOrigine.riga;
      let colonnaOrigine = ombrelloneOrigine.colonna;
      let rigaDestinazione = ombrelloneDestinazione.riga;
      let colonnaDestinazione = ombrelloneDestinazione.colonna;
      ombrelloneOrigine.riga = rigaDestinazione;
      ombrelloneOrigine.colonna = colonnaDestinazione;
      ombrelloneDestinazione.riga = rigaOrigine;
      ombrelloneDestinazione.colonna = colonnaOrigine;
      this.store.dispatch(OmbrelloniActions.UpdateOmbrelloni({ payload: ombrelloneDestinazione }));
    }
    this.store.dispatch(OmbrelloniActions.UpdateOmbrelloni({ payload: ombrelloneOrigine }));

  }

  buildGrid(numero_righe, numero_colonne) {
    if(this.mappaGrid.length == numero_righe*numero_colonne){
      this.mappaGrid.splice(0,this.mappaGrid.length)
    }
    for (var i = 1; i <= numero_righe; i++) {
      for (var j = 1; j <= numero_colonne; j++) {
        let ombrel = this.getOmbrelloneIfExist(i, j);
        let tile: Tile = { iRiga: i, iColonna: j, ombrellone: ombrel };
        this.mappaGrid.push(tile);
      }
    }
  }

  getOmbrelloneIfExist(iRiga, iColonna): Ombrellone {
    var ombrellone = this.ombrelloni.find(obj => {
      return obj.riga == iRiga && obj.colonna == iColonna
    })
    if (ombrellone != null) {
      return { id: ombrellone.id, numero: ombrellone.numero, colonna: ombrellone.colonna, riga: ombrellone.riga }
    } else {
      return null
    }
  }

  editOmbrellone(ombrellone) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = ombrellone;
    this.dialog.open(OmbrelloniEditComponent, dialogConfigDel);
  }

  addOmbrellone(iRiga, iColonna) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = { iRiga, iColonna };
    this.dialog.open(OmbrelloniCreateComponent, dialogConfigDel);
  }

  deleteOmbrellone(ombrellone) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = ombrellone;
    this.dialog.open(OmbrelloniDeleteComponent, dialogConfigDel);
  }

  updateZoom(event) {
    this.valueZoom = event.value;
    let calcRowHeightGrid = 130 - ((130 * event.value) / 100)
    this.matGridListRowHeight = 130-calcRowHeightGrid;
    localStorage.setItem("zoomLevelOmbrelloniGrid", this.valueZoom.toString());
  }

  initZoomLevel() {
    if (localStorage.getItem("zoomLevelOmbrelloniGrid")) {
      this.valueZoom = Number(localStorage.getItem("zoomLevelOmbrelloniGrid"))
      let calcRowHeightGrid = 130 - ((130 * this.valueZoom) / 100)
      this.matGridListRowHeight = 130 - calcRowHeightGrid;
      let calcCellWidth = 150 - ((150 * this.valueZoom) / 100)
      this.matGridListCellWidth = 150 - calcCellWidth;
    }
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

  setSearch(termSearch) {
    this.ombrellonename = termSearch
  }


}

