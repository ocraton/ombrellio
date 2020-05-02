import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, mergeMap, catchError} from 'rxjs/operators';
import * as MansioneActions from './mansione.actions';
import { MansioniService } from '../mansioni.service';
import { Mansioni } from '../mansioni.model';
import { Mansione } from '../mansione.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MansioneEffects {

  @Effect()
  mansioniFetch = this.actions$.pipe(
    ofType(MansioneActions.FETCH_MANSIONI),
    switchMap((action: MansioneActions.FetchMansioni) => {      
      return this.mansioniService.getAll(action.payload.search, action.payload.page)
    }), 
    map((mansioni: Mansioni) => {   
        return {
          type: MansioneActions.SET_MANSIONI,
          payload: mansioni
        };
      }
    )
  );

  
  @Effect()
  mansioneFetch = this.actions$.pipe(
    ofType(MansioneActions.FETCH_MANSIONE),
    switchMap((action: MansioneActions.FetchMansione) => {        
      return this.mansioniService.getMansione(action.payload.id_mansione)
    }), 
    map((mansione: Mansione) => {              
        return {
          type: MansioneActions.SET_MANSIONE,
          payload: mansione
        };
      }
    )
  );

  @Effect()
  mansioniStore = this.actions$.pipe(
    ofType(MansioneActions.CREATE_MANSIONE),
    map((action: MansioneActions.CreateMansione) => action.payload),
    mergeMap((mansione: Mansione) =>
    this.mansioniService.storeMansione(mansione).pipe(        
      map( (newMansione: Mansione) =>
          new MansioneActions.CreateMansioneSuccess(newMansione)
      ),
        catchError(err => of(new MansioneActions.CreateMansioneFail(err)))
      )
    )
  );

  @Effect()
  mansioniUpdate = this.actions$.pipe(
    ofType(MansioneActions.UPDATE_MANSIONE),
    map((action: MansioneActions.UpdateMansione) => action.payload),
    mergeMap(
      (payload) =>
      this.mansioniService.updateMansione(payload.index , payload.updateMansione).pipe(
        map((updateMansione: Mansione) =>
            new MansioneActions.UpdateMansioneSuccess(updateMansione)
        ),
        catchError(err => of(new MansioneActions.UpdateMansioneFail(err)))
      )
    )
  );


  @Effect()
  mansioniDelete = this.actions$.pipe(
    ofType(MansioneActions.DELETE_MANSIONE),
    map((action: MansioneActions.DeleteMansione) => action.payload),
    mergeMap((id: number) =>
      this.mansioniService.deleteMansione(id).pipe(
        map(() => new MansioneActions.DeleteMansioneSuccess(id)),
        catchError(err => of(new MansioneActions.DeleteMansioneFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, 
              private mansioniService: MansioniService,
              private router: Router) { }

}
