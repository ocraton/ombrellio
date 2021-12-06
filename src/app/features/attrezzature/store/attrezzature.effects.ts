import { Attrezzatura } from '../attrezzatura.model';
import { AttrezzatureService } from '../attrezzature.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as AttrezzatureActions from './attrezzature.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';

@Injectable()
export class AttrezzatureEffects {

  constructor(private attrezzatureService: AttrezzatureService,
              private subService: SubscriptionService,
              private actions: Actions) { }


  attrezzatureFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AttrezzatureActions.FetchAttrezzature),
      switchMap(() => {
        return this.attrezzatureService.getAll().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((attrezzatura: Attrezzatura[]) => {
        return AttrezzatureActions.SetAttrezzature({ payload: attrezzatura });
      }))
    );

  createAttrezzatura$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AttrezzatureActions.CreateAttrezzatura),
      switchMap((attrezzatura) =>
        this.attrezzatureService.createAttrezzatura(attrezzatura.payload).then(
          () => AttrezzatureActions.CreateAttrezzaturaSuccess()
        ).catch(
          error => AttrezzatureActions.CreateAttrezzaturaFail(error)
        )
      ))
    );

  updateAttrezzature$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AttrezzatureActions.UpdateAttrezzature),
      switchMap((attrezzatura) =>
        this.attrezzatureService.updateAttrezzature(attrezzatura.payload).pipe(
          map(res => res ? AttrezzatureActions.UpdateAttrezzatureSuccess() :
            AttrezzatureActions.UpdateAttrezzatureFail({payload: 'error'}))
        )
      ))
    );

  updateAttrezzatura$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AttrezzatureActions.UpdateAttrezzatura),
      switchMap((attrezzatura) =>
        this.attrezzatureService.updateAttrezzatura(attrezzatura.payload).pipe(
          map(res => res ? AttrezzatureActions.UpdateAttrezzaturaSuccess() :
            AttrezzatureActions.UpdateAttrezzaturaFail({payload: 'error'}))
        )
      ))
    );

  attrezzaturaProdottiFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AttrezzatureActions.FetchAttrezzaturaProdotti),
      switchMap((attrezzatura) => {
        return this.attrezzatureService.getAttrezzaturaProdotti(attrezzatura.payload).pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((res) => {
        let canDelete = true;
        if (res.length > 0) canDelete = false;
        return AttrezzatureActions.FetchAttrezzaturaProdottiSuccess({payload: canDelete});
      }))
  );


  deleteAttrezzatura$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(AttrezzatureActions.DeleteAttrezzatura),
      switchMap((attrezzatura) =>
        this.attrezzatureService.deleteAttrezzatura(attrezzatura.payload).then(
          () => AttrezzatureActions.DeleteAttrezzaturaSuccess({payload: 'success'})
        ).catch(
          error => AttrezzatureActions.DeleteAttrezzaturaFail(error)
        )
      ))
  );

}
