import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromOrdine from '../store/ordine.reducers';
import * as OrdineActions from '../store/ordine.actions';
import { Ordine } from '../ordini.model';

@Component({
  selector: 'app-ordine-detail',
  templateUrl: './ordine-detail.component.html',
  styleUrls: ['./ordine-detail.component.css']
})
export class OrdineDetailComponent implements OnInit {

  id: number;
  ordineState: Observable<fromOrdine.State>;
  ordine: Ordine;

  constructor(private store: Store<fromOrdine.FeatureState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );

    this.store.dispatch(new OrdineActions.FetchOrdine({ idOrdine: this.id.toString() }));
    this.ordineState = this.store.select('ordini');
  }



}
