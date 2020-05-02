import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRisorsaumana from '../../../risorseumane/store/risorsaumana.reducers';
import * as RisorsaumanaActions from '../../../risorseumane/store/risorsaumana.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RisorseumaneDeleteComponent } from '../../../risorseumane/risorseumane-delete/risorseumane-delete.component';
import { RisorseumaneDetailComponent } from '../../../risorseumane/risorseumane-detail/risorseumane-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risorse-umane',
  templateUrl: './risorse-umane.component.html',
  styleUrls: ['./risorse-umane.component.css']
})
export class RisorseUmaneComponent implements OnInit {

  @Input('aziendaid') aziendaid;
  displayedColumns: string[] = ['cognome', 'nome', 'email', 'action'];
  risorsaumanaState: Observable<fromRisorsaumana.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  termSearch: string = '';
  page_index = 0;

  constructor(private store: Store<fromRisorsaumana.FeatureState>, 
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {    
    this.store.dispatch(new RisorsaumanaActions.FetchRisorseumane({ search: this.termSearch, page: '0', azienda_id: this.aziendaid.toString() }));
    this.risorsaumanaState = this.store.select('risorseumane');
    this.paginatorIntl.translatePaginatorLabels();        
  }

  handlePage(e) {        
    this.page_index = e.pageIndex       
    this.store.dispatch(new RisorsaumanaActions.FetchRisorseumane({ 
      search: this.termSearch, 
      page: this.page_index.toString(), 
      azienda_id: this.aziendaid
    }));            
    this.risorsaumanaState = this.store.select('risorseumane');     
  }

  search(term: string) { 
    this.termSearch = term;
    this.store.dispatch(new RisorsaumanaActions.FetchRisorseumane({ search: term, page: '', azienda_id: this.aziendaid.toString() }));            
    this.risorsaumanaState = this.store.select('risorseumane');     
  }

  deleteRisorsaumana(element){
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = element;
    this.dialog.open(RisorseumaneDeleteComponent, dialogConfigDel);
  }

  editRisorsaumana(element){
    this.router.navigate(['/user/risorseumane/'+element.id+'/edit']);   
  }

  onRowClicked(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60rem';
    dialogConfig.data = row;
    this.dialog.open(RisorseumaneDetailComponent, dialogConfig);
  }

}
