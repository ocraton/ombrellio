import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRequisito from '../store/requisito.reducers';
import * as RequisitoActions from '../store/requisito.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequisitoDeleteComponent } from '../requisito-delete/requisito-delete.component';
import { RequisitoDetailComponent } from '../requisito-detail/requisito-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requisito-list',
  templateUrl: './requisito-list.component.html',
  styleUrls: ['./requisito-list.component.css']
})
export class RequisitoListComponent implements OnInit {

  displayedColumns: string[] = ['denominazione', 'action'];
  requisitoState: Observable<fromRequisito.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  termSearch: string = '';
  page_index = 0;

  constructor(private store: Store<fromRequisito.FeatureState>, 
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {    
    this.store.dispatch(new RequisitoActions.FetchRequisiti({ search: this.termSearch, page: '0' }));
    this.requisitoState = this.store.select('requisiti');
    this.paginatorIntl.translatePaginatorLabels();    
  }

  handlePage(e) {        
    this.page_index = e.pageIndex       
    this.store.dispatch(new RequisitoActions.FetchRequisiti({ 
      search: this.termSearch, 
      page: this.page_index.toString() 
    }));            
    this.requisitoState = this.store.select('requisiti');     
  }

  search(term: string) { 
    this.termSearch = term;
    this.store.dispatch(new RequisitoActions.FetchRequisiti({ search: term, page: '' }));            
    this.requisitoState = this.store.select('requisiti');
  }

  deleteRequisito(element){
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = element;
    this.dialog.open(RequisitoDeleteComponent, dialogConfigDel);
  }

  editRequisito(element){
    this.router.navigate(['/user/requisiti/'+element.id+'/edit']);   
  }

  onRowClicked(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60rem';
    dialogConfig.data = row;
    this.dialog.open(RequisitoDetailComponent, dialogConfig);
  }


}
