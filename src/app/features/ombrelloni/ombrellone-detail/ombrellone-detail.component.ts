import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromOmbrellone from '../store/ombrellone.reducers';
import * as OmbrelloneActions from '../store/ombrellone.actions';
import { Ombrellone } from '../ombrelloni.model';

@Component({
  selector: 'app-ombrellone-detail',
  templateUrl: './ombrellone-detail.component.html',
  styleUrls: ['./ombrellone-detail.component.css']
})
export class OmbrelloneDetailComponent implements OnInit {

  id: number;
  ombrelloneState: Observable<fromOmbrellone.State>;
  ombrellone: Ombrellone;

  constructor(private store: Store<fromOmbrellone.FeatureState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );

    this.store.dispatch(new OmbrelloneActions.FetchOmbrellone({ idOmbrellone: this.id.toString() }));
    this.ombrelloneState = this.store.select('ombrelloni');
  }



}
