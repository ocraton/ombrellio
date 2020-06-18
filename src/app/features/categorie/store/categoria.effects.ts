import { UpdateChaletSuccess } from './../../chalets/store/chalet.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, takeUntil, debounceTime, catchError } from 'rxjs/operators';
import * as CategoriaActions from './categoria.actions';
import { CategorieService } from '../categorie.service';
import { Categoria } from '../categoria.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';

@Injectable()
export class CategoriaEffects {

  constructor(private subService: SubscriptionService,
    private actions$: Actions,
    private categorieService: CategorieService) { }

  @Effect()
  categorieFetch$ = this.actions$.pipe(
    ofType(CategoriaActions.FETCH_CATEGORIE),
    switchMap(() => {
      return this.categorieService.getAll().pipe(
        takeUntil(this.subService.unsubscribe$)
      )
    }),
    map((categoria: Categoria[]) => {
      return {
        type: CategoriaActions.SET_CATEGORIE,
        payload: categoria
      };
    })
  );

  @Effect()
  createCategoria$ = this.actions$.pipe(
    ofType(CategoriaActions.CREATE_CATEGORIA),
    map((action: CategoriaActions.CreateCategoria) => action.payload),
    switchMap((categoria) =>
      this.categorieService.createCategoria(categoria).then(
        res => new CategoriaActions.CreateCategoriaSuccess()
      ).catch(
        error => new CategoriaActions.CreateCategoriaFail(error)
      )
    )
  );


  @Effect()
  updateCategorie$ = this.actions$.pipe(
    ofType(CategoriaActions.UPDATE_CATEGORIE),
    map((action: CategoriaActions.UpdateCategorie) => action.payload),
    switchMap((categoria: Categoria[]) =>
      this.categorieService.updateCategorie(categoria).pipe(
        map(res => res ? new CategoriaActions.UpdateCategorieSuccess() :
                        new CategoriaActions.UpdateCategorieFail('error') )
      )
  ));

  @Effect()
  updateCategoria$ = this.actions$.pipe(
    ofType(CategoriaActions.UPDATE_CATEGORIA),
    map((action: CategoriaActions.UpdateCategoria) => action.payload),
    switchMap((categoria: Categoria) =>
      this.categorieService.updateCategoria(categoria).pipe(
        map(res => res ? new CategoriaActions.UpdateCategoriaSuccess() :
          new CategoriaActions.UpdateCategoriaFail('error'))
      )
    ));

}
