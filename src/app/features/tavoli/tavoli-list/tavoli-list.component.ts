import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as tavoliState from '../store/tavoli.state';
import * as fromApp from '../../../store/app.reducer';

import * as TavoliActions from '../store/tavoli.actions';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tavolo } from '../tavolo.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { TavoliEditComponent } from '../tavoli-edit/tavoli-edit.component';
import { TavoliDeleteComponent } from '../tavoli-delete/tavoli-delete.component';

@Component({
  selector: 'app-tavoli-list',
  templateUrl: './tavoli-list.component.html',
  styleUrls: ['./tavoli-list.component.scss']
})
export class TavoliListComponent implements OnInit, OnDestroy {

  tavoliState: Observable<tavoliState.default>;
  tavoli: Tavolo[] = null;
  tavoloname:string = "";


  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.dispatch(TavoliActions.FetchTavoli());
    this.store.select('tavoli').subscribe(res => {
      this.tavoli = res.tavoli as Tavolo[]
    })
    this.tavoliState = this.store.select('tavoli');
  }


  editTavolo(tavolo) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = tavolo;
    this.dialog.open(TavoliEditComponent, dialogConfigDel);
  }

  deleteTavolo(tavolo) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = tavolo;
    this.dialog.open(TavoliDeleteComponent, dialogConfigDel);
  }

  setSearch(termSearch) {
    this.tavoloname = termSearch
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

