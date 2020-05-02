import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCliente from '../store/cliente.reducers';
import * as ClienteActions from '../store/cliente.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClienteDeleteComponent } from '../cliente-delete/cliente-delete.component';
import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  displayedColumns: string[] = ['cognome', 'nome', 'email', 'action'];
  clienteState: Observable<fromCliente.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  termSearch: string = '';
  page_index = 0;

  constructor(private store: Store<fromCliente.FeatureState>, 
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {    
    this.store.dispatch(new ClienteActions.FetchClienti({ search: this.termSearch, page: '0' }));
    this.clienteState = this.store.select('clienti');
    this.paginatorIntl.translatePaginatorLabels();    
  }

  handlePage(e) {        
    this.page_index = e.pageIndex       
    this.store.dispatch(new ClienteActions.FetchClienti({ 
      search: this.termSearch, 
      page: this.page_index.toString() 
    }));            
    this.clienteState = this.store.select('clienti');     
  }

  search(term: string) { 
    this.termSearch = term;
    this.store.dispatch(new ClienteActions.FetchClienti({ search: term, page: '' }));            
    this.clienteState = this.store.select('clienti');
  }

  deleteCliente(element){
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = element;
    this.dialog.open(ClienteDeleteComponent, dialogConfigDel);
  }

  editCliente(element){
    this.router.navigate(['/user/clienti/'+element.id+'/edit']);   
  }

  onRowClicked(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60rem';
    dialogConfig.data = row;
    this.dialog.open(ClienteDetailComponent, dialogConfig);
  }


}
