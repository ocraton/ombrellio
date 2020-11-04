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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tavoli-list',
  templateUrl: './tavoli-list.component.html',
  styleUrls: ['./tavoli-list.component.scss']
})
export class TavoliListComponent implements OnInit, OnDestroy {

  tavoliState: Observable<tavoliState.default>;
  tavoli: Tavolo = null;
  displayedColumns: string[] = ['numero', 'action'];
  dataSource = new MatTableDataSource<Tavolo>();
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

  ngOnInit(): void {
    this.store.dispatch(TavoliActions.FetchTavoli());
    this.store.select('tavoli').subscribe(res => {
      this.dataSource.data = res.tavoli as Tavolo[]
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.tavoliState = this.store.select('tavoli');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

