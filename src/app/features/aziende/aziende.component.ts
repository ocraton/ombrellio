import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAzienda from './store/azienda.reducers';


@Component({
  selector: 'app-aziende',
  templateUrl: './aziende.component.html',
  styleUrls: ['./aziende.component.css']
})
export class AziendeComponent implements OnInit {

  aziendaState: Observable<fromAzienda.State>;  
  constructor(private store: Store<fromAzienda.FeatureState>) { }

  ngOnInit() {
    this.aziendaState = this.store.select('aziende');
  }

}
