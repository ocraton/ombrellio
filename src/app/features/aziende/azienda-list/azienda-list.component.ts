import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAzienda from '../store/azienda.reducers';
import * as AziendaActions from '../store/azienda.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AziendaDeleteComponent } from '../azienda-delete/azienda-delete.component';

import { Router } from '@angular/router';
import { Azienda } from '../azienda.model';

@Component({
  selector: 'app-azienda-list',
  templateUrl: './azienda-list.component.html',
  styleUrls: ['./azienda-list.component.css']
})
export class AziendaListComponent implements OnInit {

  displayedColumns: string[] = ['ragione_sociale', 'created_at', 'action'];
  aziendaState: Observable<fromAzienda.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  azienda: Azienda = null;
  aziendaListParam = {
    termSearch: '',
    pageIndex: 0,
    pageSize: 10,
    lastVisibleItem: this.azienda,
    firstItem: this.azienda,
    event: '',
  }


  constructor(private store: Store<fromAzienda.FeatureState>,
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.aziendaState = this.store.select('aziende');
    this.aziendaState.subscribe(res => {
      this.paginatorIntl.translatePaginatorLabels();
      this.aziendaListParam.lastVisibleItem = res.azienda[res.azienda.length - 1];
      this.aziendaListParam.firstItem = res.azienda[0];
    });
    this.aziendaListParam.event = '';
    this.store.dispatch(new AziendaActions.FetchAziende(this.aziendaListParam));
  }

  handlePage(e) {
    this.aziendaListParam.event = 'next';
    if (this.aziendaListParam.pageIndex > e.pageIndex) { this.aziendaListParam.event = 'prev'; }
    this.aziendaListParam.pageIndex = e.pageIndex;
    this.store.dispatch(new AziendaActions.FetchAziende(this.aziendaListParam));
  }

  search(term: string) {
    const termcapitalized = term.charAt(0).toUpperCase() + term.slice(1);
    this.aziendaListParam.termSearch = termcapitalized;
    (this.aziendaListParam.termSearch != '') ? this.aziendaListParam.event = 'search' : this.aziendaListParam.event = '' ;
    this.store.dispatch(new AziendaActions.FetchAziende(this.aziendaListParam));
  }

  deleteAzienda(azienda) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = azienda;
    this.dialog.open(AziendaDeleteComponent, dialogConfigDel);
  }

  editAzienda(element) {
    this.router.navigate(['/user/aziende/' + element.id + '/edit']);
  }

  onRowClicked(row) {
    this.router.navigate(['/user/aziende/' + row.id]);
  }


}

