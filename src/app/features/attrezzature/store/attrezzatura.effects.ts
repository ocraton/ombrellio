import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map, withLatestFrom, mergeMap, catchError} from 'rxjs/operators';
import * as AttrezzaturaActions from './attrezzatura.actions';
import { AttrezzatureService } from '../attrezzature.service';
import { Attrezzature } from '../attrezzature.model';
import { Attrezzatura } from '../attrezzatura.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AttrezzaturaEffects {

  @Effect()
  attrezzatureFetch = this.actions$.pipe(
    ofType(AttrezzaturaActions.FETCH_ATTREZZATURE),
    switchMap((action: AttrezzaturaActions.FetchAttrezzature) => {      
      return this.attrezzatureService.getAll(action.payload.search, action.payload.page)
    }), 
    map((attrezzature: Attrezzature) => {   
        return {
          type: AttrezzaturaActions.SET_ATTREZZATURE,
          payload: attrezzature
        };
      }
    )
  );

  @Effect()
  attrezzatureStore = this.actions$.pipe(
    ofType(AttrezzaturaActions.CREATE_ATTREZZATURA),
    map((action: AttrezzaturaActions.CreateAttrezzatura) => action.payload),
    mergeMap((attrezzatura: Attrezzatura) =>
    this.attrezzatureService.storeAttrezzatura(attrezzatura).pipe(        
      map( (newAttrezzatura: Attrezzatura) =>
          new AttrezzaturaActions.CreateAttrezzaturaSuccess(newAttrezzatura)
      ),
        catchError(err => of(new AttrezzaturaActions.CreateAttrezzaturaFail(err)))
      )
    )
  );

  @Effect()
  attrezzatureUpdate = this.actions$.pipe(
    ofType(AttrezzaturaActions.UPDATE_ATTREZZATURA),
    map((action: AttrezzaturaActions.UpdateAttrezzatura) => action.payload),
    mergeMap(
      (payload) =>
      this.attrezzatureService.updateAttrezzatura(payload.index , payload.updateAttrezzatura).pipe(
        map((updateAttrezzatura: Attrezzatura) =>
            new AttrezzaturaActions.UpdateAttrezzaturaSuccess(updateAttrezzatura)
        ),
        catchError(err => of(new AttrezzaturaActions.UpdateAttrezzaturaFail(err)))
      )
    )
  );


  @Effect()
  attrezzatureDelete = this.actions$.pipe(
    ofType(AttrezzaturaActions.DELETE_ATTREZZATURA),
    map((action: AttrezzaturaActions.DeleteAttrezzatura) => action.payload),
    mergeMap((id: number) =>
      this.attrezzatureService.deleteAttrezzatura(id).pipe(
        map(() => new AttrezzaturaActions.DeleteAttrezzaturaSuccess(id)),
        catchError(err => of(new AttrezzaturaActions.DeleteAttrezzaturaFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, 
              private attrezzatureService: AttrezzatureService,
              private router: Router) { }

}
