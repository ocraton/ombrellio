import { Categoria } from '../categoria.model';
import { CategorieService } from '../categorie.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import * as CategorieActions from './categorie.actions';
import { Action } from '@ngrx/store';
import { SubscriptionService } from '../../../core/services/subscription.service';

@Injectable()
export class CategorieEffects {

  constructor(private categorieService: CategorieService,
              private subService: SubscriptionService,
              private actions: Actions) { }


  categorieFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(CategorieActions.FetchCategorie),
      switchMap(() => {
        return this.categorieService.getAll().pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((categoria: Categoria[]) => {
        return CategorieActions.SetCategorie({ payload: categoria });
      }))
    );

  createCategoria$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(CategorieActions.CreateCategoria),
      switchMap((categoria) =>
        this.categorieService.createCategoria(categoria.payload).then(
          () => CategorieActions.CreateCategoriaSuccess()
        ).catch(
          error => CategorieActions.CreateCategoriaFail(error)
        )
      ))
    );

  updateCategorie$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(CategorieActions.UpdateCategorie),
      switchMap((categoria) =>
        this.categorieService.updateCategorie(categoria.payload).pipe(
          map(res => res ? CategorieActions.UpdateCategorieSuccess() :
            CategorieActions.UpdateCategorieFail({payload: 'error'}))
        )
      ))
    );

  updateCategoria$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(CategorieActions.UpdateCategoria),
      switchMap((categoria) =>
        this.categorieService.updateCategoria(categoria.payload).pipe(
          map(res => res ? CategorieActions.UpdateCategoriaSuccess() :
            CategorieActions.UpdateCategoriaFail({payload: 'error'}))
        )
      ))
    );

  categoriaProdottiFetch$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(CategorieActions.FetchCategoriaProdotti),
      switchMap((categoria) => {
        return this.categorieService.getCategoriaProdotti(categoria.payload).pipe(
          takeUntil(this.subService.unsubscribe$)
        )
      }),
      map((res) => {
        let canDelete = true;
        if (res.length > 0) canDelete = false;
        return CategorieActions.FetchCategoriaProdottiSuccess({payload: canDelete});
      }))
  );


  deleteCategoria$: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(CategorieActions.DeleteCategoria),
      switchMap((categoria) =>
        this.categorieService.deleteCategoria(categoria.payload).then(
          () => CategorieActions.DeleteCategoriaSuccess({payload: 'success'})
        ).catch(
          error => CategorieActions.DeleteCategoriaFail(error)
        )
      ))
  );

}
