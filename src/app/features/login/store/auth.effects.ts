import { AuthService } from './../../../core/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { Action } from '@ngrx/store';



@Injectable()
export class AuthEffects {

  constructor(private authService: AuthService, private actions$: Actions) { }

  authSignin$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Login),
      map(action => action.payload),
      switchMap((authData: { email: string, password: string, uid: string, chaletUID: string }) => {
        return this.authService.login(authData)
          .then(() => {
            return AuthActions.LogInSuccess({ payload: authData });
          })
          .catch((errorMsg) => {
            return AuthActions.LogInError({ payload: errorMsg });
          });
      })
    )
  );

  authSignout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.Logout),
      tap(() => {return this.authService.logout()})
    ), { dispatch: false });




}
