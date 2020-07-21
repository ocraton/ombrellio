import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../store/app.reducer';
import * as authState from './store/auth.state';
import * as AuthActions from '../../features/login/store/auth.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authState: Observable<authState.default>;
  model: any = {};

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onLogin() {
    const email = this.model.email;
    const password = this.model.password;
    this.store.dispatch(AuthActions.Login({payload: { email, password }}));
  }

}
