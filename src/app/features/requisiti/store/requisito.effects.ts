import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, mergeMap, catchError} from 'rxjs/operators';
import * as RequisitoActions from './requisito.actions';
import { RequisitiService } from '../requisiti.service';
import { Requisiti } from '../requisiti.model';
import { Requisito } from '../requisito.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RequisitoEffects {

  @Effect()
  requisitiFetch = this.actions$.pipe(
    ofType(RequisitoActions.FETCH_REQUISITI),
    switchMap((action: RequisitoActions.FetchRequisiti) => {      
      return this.requisitiService.getAll(action.payload.search, action.payload.page)
    }), 
    map((requisiti: Requisiti) => {   
        return {
          type: RequisitoActions.SET_REQUISITI,
          payload: requisiti
        };
      }
    )
  );

  @Effect()
  requisitiStore = this.actions$.pipe(
    ofType(RequisitoActions.CREATE_REQUISITO),
    map((action: RequisitoActions.CreateRequisito) => action.payload),
    mergeMap((requisito: Requisito) =>
    this.requisitiService.storeRequisito(requisito).pipe(        
      map( (newRequisito: Requisito) =>
          new RequisitoActions.CreateRequisitoSuccess(newRequisito)
      ),
        catchError(err => of(new RequisitoActions.CreateRequisitoFail(err)))
      )
    )
  );

  @Effect()
  requisitiUpdate = this.actions$.pipe(
    ofType(RequisitoActions.UPDATE_REQUISITO),
    map((action: RequisitoActions.UpdateRequisito) => action.payload),
    mergeMap(
      (payload) =>
      this.requisitiService.updateRequisito(payload.index , payload.updateRequisito).pipe(
        map((updateRequisito: Requisito) =>
            new RequisitoActions.UpdateRequisitoSuccess(updateRequisito)
        ),
        catchError(err => of(new RequisitoActions.UpdateRequisitoFail(err)))
      )
    )
  );


  @Effect()
  requisitiDelete = this.actions$.pipe(
    ofType(RequisitoActions.DELETE_REQUISITO),
    map((action: RequisitoActions.DeleteRequisito) => action.payload),
    mergeMap((id: number) =>
      this.requisitiService.deleteRequisito(id).pipe(
        map(() => new RequisitoActions.DeleteRequisitoSuccess(id)),
        catchError(err => of(new RequisitoActions.DeleteRequisitoFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, 
              private requisitiService: RequisitiService,
              private router: Router) { }

}
