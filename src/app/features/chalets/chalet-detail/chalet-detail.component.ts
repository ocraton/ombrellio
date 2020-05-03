import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromChalet from '../store/chalet.reducers';
import * as ChaletActions from '../store/chalet.actions';
import { Chalet } from '../chalet.model';

@Component({
  selector: 'app-chalet-detail',
  templateUrl: './chalet-detail.component.html',
  styleUrls: ['./chalet-detail.component.css']
})
export class ChaletDetailComponent implements OnInit {

  id: number;
  chaletState: Observable<fromChalet.State>;
  chalet: Chalet;

  constructor(private store: Store<fromChalet.FeatureState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );

    this.store.dispatch(new ChaletActions.FetchChalet({ idChalet: this.id.toString() }));
    this.chaletState = this.store.select('chalets');
  }



}
