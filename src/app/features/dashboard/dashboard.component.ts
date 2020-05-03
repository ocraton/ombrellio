import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromChalet from '../chalets/store/chalet.reducers';
import * as ChaletActions from '../chalets/store/chalet.actions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chaletState: Observable<fromChalet.State>;

  constructor(private storeChalet: Store<fromChalet.FeatureState>) { }

  ngOnInit() {
    this.storeChalet.dispatch(new ChaletActions.FetchCountChalets);
    this.chaletState = this.storeChalet.select('chalets');
  }

}
