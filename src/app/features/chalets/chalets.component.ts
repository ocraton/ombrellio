import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromChalet from './store/chalet.reducers';


@Component({
  selector: 'app-chalets',
  templateUrl: './chalets.component.html',
  styleUrls: ['./chalets.component.css']
})
export class ChaletsComponent implements OnInit {

  chaletState: Observable<fromChalet.State>;
  constructor(private store: Store<fromChalet.FeatureState>) { }

  ngOnInit() {
    this.chaletState = this.store.select('chalets');
  }

}
