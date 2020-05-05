import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import * as OmbrelloneActions from './ombrellone.actions';
import { OmbrelloniService } from '../ombrelloni.service';
import { Ombrellone } from '../ombrelloni.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class OmbrelloneEffects {

  @Effect()
  ombrelloniFetch$ = this.actions$.pipe(
    ofType(OmbrelloneActions.FETCH_OMBRELLONI),
    switchMap(() => {
      return this.ombrelloniService.getAll()
    }),
    map((ombrellone: Ombrellone[]) => {
      return {
        type: OmbrelloneActions.SET_OMBRELLONI,
        payload: ombrellone
      };
    })
  );

  @Effect()
  ombrelloneFetch$ = this.actions$.pipe(
    ofType(OmbrelloneActions.FETCH_OMBRELLONE),
    switchMap((action: OmbrelloneActions.FetchOmbrellone) => {
      return this.ombrelloniService.getOmbrellone(action.payload.idOmbrellone)
    }),
    map((ombrellone: Ombrellone) => {
      return {
        type: OmbrelloneActions.SET_OMBRELLONE,
        payload: ombrellone
      };
    }
    )
  );

  @Effect()
  ombrelloneCountFetch$ = this.actions$.pipe(
    ofType(OmbrelloneActions.FETCH_COUNT_OMBRELLONI),
    switchMap((action: OmbrelloneActions.FetchCountOmbrelloni) => {
      return this.ombrelloniService.getCountOmbrelloni();
    }),
    map(countOmbrelloni => {
      return { type: OmbrelloneActions.SET_COUNT_OMBRELLONI, payload: countOmbrelloni['count'] };
    }
    )
  );

  @Effect({ dispatch: false })
  updateOmbrellone$ = this.actions$.pipe(
    ofType(OmbrelloneActions.UPDATE_OMBRELLONE),
    map((action: OmbrelloneActions.CreateOmbrellone) => action.payload),
    switchMap((ombrellone: Ombrellone) =>
      this.ombrelloniService.updateOmbrellone(ombrellone).then(
        () => { new OmbrelloneActions.UpdateOmbrelloneSuccess('success') }
      ).catch(
        error => { new OmbrelloneActions.UpdateOmbrelloneFail(error) }
      )
    )
  );

  @Effect({ dispatch: false })
  createOmbrellone$ = this.actions$.pipe(
    ofType(OmbrelloneActions.CREATE_OMBRELLONE),
    map((action: OmbrelloneActions.CreateOmbrellone) => action.payload),
    switchMap((ombrellone: Ombrellone) =>
      this.ombrelloniService.createOmbrellone(ombrellone).then(
        docRef => { new OmbrelloneActions.CreateOmbrelloneSuccess(docRef.id.toString()) }
      ).catch(
        error => { new OmbrelloneActions.CreateOmbrelloneFail(error) }
      )
    )
  );

  @Effect({ dispatch: false })
  ombrelloniDelete = this.actions$.pipe(
    ofType(OmbrelloneActions.DELETE_OMBRELLONE),
    map((action: OmbrelloneActions.DeleteOmbrellone) => action.payload),
    switchMap((ombrelloneId) =>
      this.ombrelloniService.deleteOmbrellone(ombrelloneId).then(
        () => { new OmbrelloneActions.DeleteOmbrelloneSuccess('') },
        catchError(err => of(new OmbrelloneActions.DeleteOmbrelloneFail(err)))
      )
    )
  );

  constructor(private actions$: Actions,
    private ombrelloniService: OmbrelloniService,
    private router: Router) { }

}
