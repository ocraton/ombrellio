import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAzienda from '../aziende/store/azienda.reducers';
import * as AziendaActions from '../aziende/store/azienda.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  aziendaState: Observable<fromAzienda.State>;

  constructor(private storeAzienda: Store<fromAzienda.FeatureState>) { }

  ngOnInit() {
    this.storeAzienda.dispatch(new AziendaActions.FetchCountAziende);
    this.aziendaState = this.storeAzienda.select('aziende');
  }

}
