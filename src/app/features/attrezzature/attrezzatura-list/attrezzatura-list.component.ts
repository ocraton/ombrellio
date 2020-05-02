import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAttrezzatura from '../store/attrezzatura.reducers';
import * as AttrezzaturaActions from '../store/attrezzatura.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttrezzaturaDeleteComponent } from '../attrezzatura-delete/attrezzatura-delete.component';
import { AttrezzaturaDetailComponent } from '../attrezzatura-detail/attrezzatura-detail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-attrezzatura-list',
  templateUrl: './attrezzatura-list.component.html',
  styleUrls: ['./attrezzatura-list.component.css']
})
export class AttrezzaturaListComponent implements OnInit {

  displayedColumns: string[] = ['matricola', 'denominazione', 'costruttore', 'action'];
  attrezzaturaState: Observable<fromAttrezzatura.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  termSearch: string = '';
  page_index = 0;

  constructor(private store: Store<fromAttrezzatura.FeatureState>, 
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {    
    this.store.dispatch(new AttrezzaturaActions.FetchAttrezzature({ search: this.termSearch, page: '0' }));
    this.attrezzaturaState = this.store.select('attrezzature');
    this.paginatorIntl.translatePaginatorLabels();    
  }

  handlePage(e) {        
    this.page_index = e.pageIndex       
    this.store.dispatch(new AttrezzaturaActions.FetchAttrezzature({ 
      search: this.termSearch, 
      page: this.page_index.toString() 
    }));            
    this.attrezzaturaState = this.store.select('attrezzature');     
  }

  search(term: string) { 
    this.termSearch = term;
    this.store.dispatch(new AttrezzaturaActions.FetchAttrezzature({ search: term, page: '' }));            
    this.attrezzaturaState = this.store.select('attrezzature');
  }

  deleteAttrezzatura(element){
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = element;
    this.dialog.open(AttrezzaturaDeleteComponent, dialogConfigDel);
  }

  editAttrezzatura(element){
    this.router.navigate(['/user/attrezzature/'+element.id+'/edit']);   
  }

  onRowClicked(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60rem';
    dialogConfig.data = row;
    this.dialog.open(AttrezzaturaDetailComponent, dialogConfig);
  }


}
