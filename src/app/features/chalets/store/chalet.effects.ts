import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import * as ChaletActions from './chalet.actions';
import { ChaletsService } from '../chalets.service';
import { Chalet } from '../chalet.model';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class ChaletEffects {

  @Effect()
  chaletsFetch$ = this.actions$.pipe(
    ofType(ChaletActions.FETCH_CHALETS),
    switchMap(() => {
      return this.chaletsService.getAll()
    }),
    map((chalet: Chalet[]) => {
      return {
        type: ChaletActions.SET_CHALETS,
        payload: chalet
      };
    })
  );

  @Effect()
  chaletFetch$ = this.actions$.pipe(
    ofType(ChaletActions.FETCH_CHALET),
    switchMap((action: ChaletActions.FetchChalet) => {
      return this.chaletsService.getChalet(action.payload.idChalet)
    }),
    map((chalet: Chalet) => {
      return {
        type: ChaletActions.SET_CHALET,
        payload: chalet
      };
    }
    )
  );

  @Effect()
  chaletCountFetch$ = this.actions$.pipe(
    ofType(ChaletActions.FETCH_COUNT_CHALETS),
    switchMap((action: ChaletActions.FetchCountChalets) => {
      return this.chaletsService.getCountChalets();
    }),
    map(countChalets => {
      return { type: ChaletActions.SET_COUNT_CHALETS, payload: countChalets['count'] };
    }
    )
  );

  @Effect({ dispatch: false })
  updateChalet$ = this.actions$.pipe(
    ofType(ChaletActions.UPDATE_CHALET),
    map((action: ChaletActions.CreateChalet) => action.payload),
    switchMap((chalet: Chalet) =>
      this.chaletsService.updateChalet(chalet).then(
        () => { new ChaletActions.UpdateChaletSuccess('success') }
      ).catch(
        error => { new ChaletActions.UpdateChaletFail(error) }
      )
    )
  );

  @Effect({ dispatch: false })
  createChalet$ = this.actions$.pipe(
    ofType(ChaletActions.CREATE_CHALET),
    map((action: ChaletActions.CreateChalet) => action.payload),
    switchMap((chalet: Chalet) =>
      this.chaletsService.createChalet(chalet).then(
        docRef => { new ChaletActions.CreateChaletSuccess(docRef.id.toString()) }
      ).catch(
        error => { new ChaletActions.CreateChaletFail(error) }
      )
    )
  );

  @Effect({ dispatch: false })
  chaletsDelete = this.actions$.pipe(
    ofType(ChaletActions.DELETE_CHALET),
    map((action: ChaletActions.DeleteChalet) => action.payload),
    switchMap((chaletId) =>
      this.chaletsService.deleteChalet(chaletId).then(
        () => { new ChaletActions.DeleteChaletSuccess('') },
        catchError(err => of(new ChaletActions.DeleteChaletFail(err)))
      )
    )
  );

  constructor(private actions$: Actions,
    private chaletsService: ChaletsService,
    private router: Router) { }

}
