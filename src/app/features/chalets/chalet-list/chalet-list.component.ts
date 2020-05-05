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
  chalet: Chalet = null;

  constructor(private store: Store<fromChalet.FeatureState>,
              private paginatorIntl: TranslateService,
              private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new ChaletActions.FetchChalets);
    this.chaletState = this.store.select('chalets');
    this.paginatorIntl.translatePaginatorLabels();
  }

  editChalet(element) {
    this.router.navigate(['/user/chalets/' + element.id + '/edit']);
  }


}

