import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../features/login/store/auth.reducers';
import * as AuthActions from '../../features/login/store/auth.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.Login({email, password}));
  }

}
