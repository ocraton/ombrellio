import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, mergeMap, catchError} from 'rxjs/operators';
import * as RisorsaumanaActions from './risorsaumana.actions';
import { RisorseumaneService } from '../risorseumane.service';
import { Risorseumane } from '../risorseumane.model';
import { Risorsaumana } from '../risorsaumana.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RisorsaumanaEffects {

  @Effect()
  risorseumaneFetch = this.actions$.pipe(
    ofType(RisorsaumanaActions.FETCH_RISORSEUMANE),
    switchMap((action: RisorsaumanaActions.FetchRisorseumane) => {      
      return this.risorseumaneService.getAll(action.payload.search, action.payload.page, action.payload.azienda_id)
    }), 
    map((risorseumane: Risorseumane) => {
        return {
          type: RisorsaumanaActions.SET_RISORSEUMANE,
          payload: risorseumane
        };
      }
    )
  );

  @Effect()
  risorseumaneStore = this.actions$.pipe(
    ofType(RisorsaumanaActions.CREATE_RISORSAUMANA),
    map((action: RisorsaumanaActions.CreateRisorsaumana) => action.payload),
    mergeMap((risorsaumana: Risorsaumana) =>
    this.risorseumaneService.storeRisorsaumana(risorsaumana).pipe(        
      map( (newRisorsaumana: Risorsaumana) =>
          new RisorsaumanaActions.CreateRisorsaumanaSuccess(newRisorsaumana)
      ),
        catchError(err => of(new RisorsaumanaActions.DeleteRisorsaumanaFail(err)))
      )
    )
  );

  @Effect()
  risorseumaneUpdate = this.actions$.pipe(
    ofType(RisorsaumanaActions.UPDATE_RISORSAUMANA),
    map((action: RisorsaumanaActions.UpdateRisorsaumana) => action.payload),
    mergeMap(
      (payload) =>
      this.risorseumaneService.updateRisorsaumana(payload.index , payload.updateRisorsaumana).pipe(
        map((updateRisorsaumana: Risorsaumana) =>
            new RisorsaumanaActions.UpdateRisorsaumanaSuccess(updateRisorsaumana)
        ),
        catchError(err => of(new RisorsaumanaActions.UpdateRisorsaumanaFail(err)))
      )
    )
  );


  @Effect()
  risorsaumanaDelete = this.actions$.pipe(
    ofType(RisorsaumanaActions.DELETE_RISORSAUMANA),
    map((action: RisorsaumanaActions.DeleteRisorsaumana) => action.payload),
    mergeMap((id: number) =>
      this.risorseumaneService.deleteRisorsaumana(id).pipe(
        map(() => new RisorsaumanaActions.DeleteRisorsaumanaSuccess(id)),
        catchError(err => of(new RisorsaumanaActions.DeleteRisorsaumanaFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, 
              private risorseumaneService: RisorseumaneService,
              private router: Router) { }

}
