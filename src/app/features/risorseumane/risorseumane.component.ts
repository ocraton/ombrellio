import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRisorsaumana from './store/risorsaumana.reducers';


@Component({
  selector: 'app-risorseumane',
  templateUrl: './risorseumane.component.html',
  styleUrls: ['./risorseumane.component.css']
})
export class RisorseumaneComponent implements OnInit {

  risorsaumanaState: Observable<fromRisorsaumana.State>;  
  
  constructor(private store: Store<fromRisorsaumana.FeatureState>) { }

  ngOnInit() {
    this.risorsaumanaState = this.store.select('risorseumane');    
  }

}
