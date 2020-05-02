import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRequisito from './store/requisito.reducers';

@Component({
  selector: 'app-requisiti',
  templateUrl: './requisiti.component.html',
  styleUrls: ['./requisiti.component.css']
})
export class RequisitiComponent implements OnInit {
 
  requisitoState: Observable<fromRequisito.State>;  
  constructor(private store: Store<fromRequisito.FeatureState>) { }

  ngOnInit() {
    this.requisitoState = this.store.select('requisiti');
  }

}
