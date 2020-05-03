import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromChalet from '../store/chalet.reducers';
import * as ChaletActions from '../store/chalet.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChaletDeleteComponent } from '../chalet-delete/chalet-delete.component';

import { Router } from '@angular/router';
import { Chalet } from '../chalet.model';

@Component({
  selector: 'app-chalet-list',
  templateUrl: './chalet-list.component.html',
  styleUrls: ['./chalet-list.component.css']
})
export class ChaletListComponent implements OnInit {

  displayedColumns: string[] = ['ragione_sociale', 'created_at', 'action'];
  chaletState: Observable<fromChalet.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  chalet: Chalet = null;
  chaletListParam = {
    termSearch: '',
    pageIndex: 0,
    pageSize: 10,
    lastVisibleItem: this.chalet,
    firstItem: this.chalet,
    event: '',
  }


  constructor(private store: Store<fromChalet.FeatureState>,
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.chaletState = this.store.select('chalets');
    this.chaletState.subscribe(res => {
      this.paginatorIntl.translatePaginatorLabels();
      this.chaletListParam.lastVisibleItem = res.chalet[res.chalet.length - 1];
      this.chaletListParam.firstItem = res.chalet[0];
    });
    this.chaletListParam.event = '';
    this.store.dispatch(new ChaletActions.FetchChalets(this.chaletListParam));
  }

  handlePage(e) {
    this.chaletListParam.event = 'next';
    if (this.chaletListParam.pageIndex > e.pageIndex) { this.chaletListParam.event = 'prev'; }
    this.chaletListParam.pageIndex = e.pageIndex;
    this.store.dispatch(new ChaletActions.FetchChalets(this.chaletListParam));
  }

  search(term: string) {
    const termcapitalized = term.charAt(0).toUpperCase() + term.slice(1);
    this.chaletListParam.termSearch = termcapitalized;
    (this.chaletListParam.termSearch != '') ? this.chaletListParam.event = 'search' : this.chaletListParam.event = '' ;
    this.store.dispatch(new ChaletActions.FetchChalets(this.chaletListParam));
  }

  deleteChalet(chalet) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = chalet;
    this.dialog.open(ChaletDeleteComponent, dialogConfigDel);
  }

  editChalet(element) {
    this.router.navigate(['/user/chalets/' + element.id + '/edit']);
  }

  onRowClicked(row) {
    this.router.navigate(['/user/chalets/' + row.id]);
  }


}

