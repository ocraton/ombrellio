import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCategoria from '../store/categoria.reducers';
import * as CategoriaActions from '../store/categoria.actions';

import { Categoria } from '../categoria.model';
import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categoriaState: Observable<fromCategoria.State>;
  categorie: Categoria[] = [];

  constructor(private store: Store<fromCategoria.FeatureState>,
              private subService: SubscriptionService) { }

  ngOnInit() {
    this.store.dispatch(new CategoriaActions.FetchCategorie);
    this.categoriaState = this.store.select('categorie');
    this.categoriaState.subscribe(cat => this.categorie = cat.categoria)
  }

  drop(event: CdkDragDrop<Categoria[]>) {
    moveItemInArray(this.categorie, event.previousIndex, event.currentIndex);
    this.categorie.map((catItem, index) => {
      return catItem.ordinamento = index+1
    })
    this.store.dispatch(new CategoriaActions.UpdateCategorie(this.categorie));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

