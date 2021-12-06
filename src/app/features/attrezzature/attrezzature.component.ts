import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as attrezzatureState from './store/attrezzature.state';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-attrezzature',
  templateUrl: './attrezzature.component.html',
  styleUrls: ['./attrezzature.component.scss']
})
export class AttrezzatureComponent implements OnInit {

  attrezzaturaState: Observable<attrezzatureState.default>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.attrezzaturaState = this.store.select('attrezzature');
  }

}
