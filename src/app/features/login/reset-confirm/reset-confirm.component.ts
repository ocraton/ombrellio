import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import * as authState from './../store/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reset-confirm',
  templateUrl: './reset-confirm.component.html',
  styleUrls: ['./reset-confirm.component.scss']
})
export class ResetConfirmComponent implements OnInit {

  authState: Observable<authState.default>;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }


}
