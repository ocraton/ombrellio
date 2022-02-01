import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as authState from './../store/auth.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-servizio-scaduto',
    templateUrl: './servizio-scaduto.component.html',
    styleUrls: ['./servizio-scaduto.component.scss']
})
export class ServizioScadutoComponent implements OnInit {


  authState: Observable<authState.default>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }


}
