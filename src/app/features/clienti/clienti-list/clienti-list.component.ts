import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as clientiState from '../store/clienti.state';
import * as fromApp from '../../../store/app.reducer';

import * as ClientiActions from '../store/clienti.actions';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Cliente } from '../cliente.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { ClientiEditComponent } from '../clienti-edit/clienti-edit.component';
import { ClientiDeleteComponent } from '../clienti-delete/clienti-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-clienti-list',
  templateUrl: './clienti-list.component.html',
  styleUrls: ['./clienti-list.component.scss']
})
export class ClientiListComponent implements OnInit, OnDestroy {

  clientiState: Observable<clientiState.default>;
  clienti: Cliente = null;
  displayedColumns: string[] = ['nome', 'cognome', 'telefono', 'email', 'action'];
  dataSource = new MatTableDataSource<Cliente>();
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
    this.store.dispatch(ClientiActions.FetchClienti());
    this.store.select('clienti').subscribe(res => {
      this.dataSource.data = res.clienti as Cliente[]
    })
    this.clientiState = this.store.select('clienti');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCliente(cliente) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = cliente;
    this.dialog.open(ClientiEditComponent, dialogConfigDel);
  }

  deleteCliente(cliente) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = cliente;
    this.dialog.open(ClientiDeleteComponent, dialogConfigDel);
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

