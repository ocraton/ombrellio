import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromMansione from './store/mansione.reducers';

@Component({
  selector: 'app-mansioni',
  templateUrl: './mansioni.component.html',
  styleUrls: ['./mansioni.component.css']
})
export class MansioniComponent implements OnInit {
 
  mansioneState: Observable<fromMansione.State>;  
  constructor(private store: Store<fromMansione.FeatureState>) { }

  ngOnInit() {
    this.mansioneState = this.store.select('mansioni');
  }

}
