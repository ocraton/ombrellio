import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ordiniState from '../store/ordini.state';
import * as fromApp from '../../../store/app.reducer';
import * as OrdiniActions from '../store/ordini.actions';
import { Ordine } from '../ordini.model';

@Component({
  selector: 'app-ordine-detail',
  templateUrl: './ordine-detail.component.html',
  styleUrls: ['./ordine-detail.component.scss']
})
export class OrdineDetailComponent implements OnInit {

  id: number;
  ordineState: Observable<ordiniState.default>;
  ordine: Ordine;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );

    this.store.dispatch(OrdiniActions.FetchOrdine({ idOrdine: this.id.toString() }));
    this.ordineState = this.store.select('ordini');
  }



}
