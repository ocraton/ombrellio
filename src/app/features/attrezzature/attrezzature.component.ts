import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAttrezzatura from './store/attrezzatura.reducers';

@Component({
  selector: 'app-attrezzature',
  templateUrl: './attrezzature.component.html',
  styleUrls: ['./attrezzature.component.css']
})
export class AttrezzatureComponent implements OnInit {
 
  attrezzaturaState: Observable<fromAttrezzatura.State>;  
  constructor(private store: Store<fromAttrezzatura.FeatureState>) { }

  ngOnInit() {
    this.attrezzaturaState = this.store.select('attrezzature');
  }

}
