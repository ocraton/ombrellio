import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMansione from '../store/mansione.reducers';
import * as MansioneActions from '../store/mansione.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MansioneDeleteComponent } from '../mansione-delete/mansione-delete.component';
import { MansioneDetailComponent } from '../mansione-detail/mansione-detail.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mansione-list',
  templateUrl: './mansione-list.component.html',
  styleUrls: ['./mansione-list.component.css']
})
export class MansioneListComponent implements OnInit {

  displayedColumns: string[] = ['denominazione', 'action'];
  mansioneState: Observable<fromMansione.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  termSearch: string = '';
  page_index = 0;

  constructor(private store: Store<fromMansione.FeatureState>, 
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {    
    this.store.dispatch(new MansioneActions.FetchMansioni({ search: this.termSearch, page: '0' }));
    this.mansioneState = this.store.select('mansioni');
    this.paginatorIntl.translatePaginatorLabels();    
  }

  handlePage(e) {        
    this.page_index = e.pageIndex       
    this.store.dispatch(new MansioneActions.FetchMansioni({ 
      search: this.termSearch, 
      page: this.page_index.toString() 
    }));            
    this.mansioneState = this.store.select('mansioni');     
  }

  search(term: string) { 
    this.termSearch = term;
    this.store.dispatch(new MansioneActions.FetchMansioni({ search: term, page: '' }));            
    this.mansioneState = this.store.select('mansioni');
  }

  deleteMansione(element){
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = element;
    this.dialog.open(MansioneDeleteComponent, dialogConfigDel);
  }

  editMansione(element){
    this.router.navigate(['/user/mansioni/'+element.id+'/edit']);   
  }

  onRowClicked(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60rem';
    dialogConfig.data = row;
    this.dialog.open(MansioneDetailComponent, dialogConfig);
  }


}
