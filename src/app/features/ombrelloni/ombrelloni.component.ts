import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromOmbrellone from './store/ombrellone.reducers';


@Component({
  selector: 'app-ombrelloni',
  templateUrl: './ombrelloni.component.html',
  styleUrls: ['./ombrelloni.component.css']
})
export class OmbrelloniComponent implements OnInit {

  ombrelloneState: Observable<fromOmbrellone.State>;
  constructor(private store: Store<fromOmbrellone.FeatureState>) { }

  ngOnInit() {
    this.ombrelloneState = this.store.select('ombrelloni');
  }

}
