import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromOmbrellone from '../store/ombrellone.reducers';
import * as OmbrelloneActions from '../store/ombrellone.actions';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { Ombrellone } from '../ombrelloni.model';

@Component({
  selector: 'app-ombrellone-list',
  templateUrl: './ombrellone-list.component.html',
  styleUrls: ['./ombrellone-list.component.css']
})
export class OmbrelloneListComponent implements OnInit {

  displayedColumns: string[] = ['ragione_sociale', 'created_at', 'action'];
  ombrelloneState: Observable<fromOmbrellone.State>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ombrellone: Ombrellone = null;


  constructor(private store: Store<fromOmbrellone.FeatureState>,
              private paginatorIntl: TranslateService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    // this.store.dispatch(new OmbrelloneActions.FetchOmbrelloni());
    // this.ombrelloneState = this.store.select('ombrelloni');
    // this.paginatorIntl.translatePaginatorLabels();

  }



}

