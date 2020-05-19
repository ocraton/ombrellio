import { Injectable } from '@angular/core';

import { Auth } from '../model/auth.model';
import * as AuthActions from '../../features/login/store/auth.actions';

import { AngularFireAuth } from '@angular/fire/auth';
import * as fromApp from '../../store/app.reducers';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;

  constructor(private afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.auth = { email: user.email, password: '', uid: user.uid, chaletUID: '' };
        this.store.dispatch(new AuthActions.LogInSuccess(this.auth));
        this.router.navigate(['/user']);
      } else {
        this.store.dispatch(new AuthActions.Logout());
        this.router.navigate(['/login']);
      }
    });
  }

  login(authData: Auth) {
    return this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password);
  }

  logout() {
    this.afAuth.auth.signOut()
  }

}
