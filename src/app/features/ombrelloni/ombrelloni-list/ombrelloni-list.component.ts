import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ombrelloniState from '../store/ombrelloni.state';
import * as fromApp from '../../../store/app.reducer';

import * as OmbrelloniActions from '../store/ombrelloni.actions';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ombrellone } from '../ombrellone.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { OmbrelloniEditComponent } from '../ombrelloni-edit/ombrelloni-edit.component';
import { OmbrelloniDeleteComponent } from '../ombrelloni-delete/ombrelloni-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-ombrelloni-list',
  templateUrl: './ombrelloni-list.component.html',
  styleUrls: ['./ombrelloni-list.component.scss']
})
export class OmbrelloniListComponent implements OnInit, OnDestroy {

  ombrelloniState: Observable<ombrelloniState.default>;
  ombrelloni: Ombrellone = null;
  displayedColumns: string[] = ['numero', 'action'];
  dataSource = new MatTableDataSource<Ombrellone>();
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
    this.store.dispatch(OmbrelloniActions.FetchOmbrelloni());
    this.store.select('ombrelloni').subscribe(res => {
      this.dataSource.data = res.ombrelloni as Ombrellone[]
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.ombrelloniState = this.store.select('ombrelloni');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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

  deleteOmbrellone(ombrellone) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = ombrellone;
    this.dialog.open(OmbrelloniDeleteComponent, dialogConfigDel);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

