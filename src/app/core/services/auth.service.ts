import { takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Auth } from '../model/auth.model';
import * as AuthActions from '../../features/login/store/auth.actions';

import { AngularFireAuth } from '@angular/fire/auth';
import * as fromApp from '../../store/app.reducer';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { SubscriptionService } from './subscription.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth: Auth;

  constructor(private afAuth: AngularFireAuth,
              private subService: SubscriptionService,
              private db: AngularFirestore,
              private store: Store<fromApp.AppState>,
              private router: Router) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
          this.db.doc('utenti/'+user.uid).valueChanges().pipe(
            takeUntil(this.subService.unsubscribe$)
          ).subscribe(utente => {
              this.auth = {
                email: user.email,
                password: '',
                uid: user.uid,
                chaletUID: utente['chalet_uid']
              };
              if(utente['chalet_uid'] != ''){
                if (this.router.url != `/menu/${utente['chalet_uid']}`){
                  this.router.navigate(['/user/ordini']);
                }
              } else {
                this.router.navigate(['/user/chalets']);
              }
              this.store.dispatch(AuthActions.LogInSuccess({payload: this.auth}))
            }
          )
      } else {
            var re = new RegExp("^\/menu\/([a-zA-Z0-9]){20,30}$");
            if(re.test(this.router.url)){
              this.router.navigate([this.router.url]);
            } else if (this.router.url === '/utenti/register'){
              this.router.navigate(['/utenti/register']);
            }
            else {
              this.store.dispatch(AuthActions.Logout());
              this.router.navigate(['/login']);
            }
      }
    });
  }



  login(authData: Auth) {
    return this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
  }

  logout() {
    this.afAuth.signOut()
  }

}
