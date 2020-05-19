import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, switchMap, tap} from 'rxjs/operators';

import { AuthService } from 'src/app/core/services/auth.service';
import * as AuthActions from './auth.actions';
import { Auth } from 'src/app/core/model/auth.model';
import { from } from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    map((action: AuthActions.Login) => action.payload),
    switchMap((authData: { email: string, password: string, uid: string, chaletUID: string }) => {
      return this.authService.login(authData)
        .then(() => {
          return new AuthActions.LogInSuccess(authData);
        })
        .catch((errorMsg) => {
          return new AuthActions.LogInError({ errorMsg });
        });
    })
  );

  @Effect({dispatch: false})
  authSignout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    map(() => {
      return this.authService.logout();
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

}
