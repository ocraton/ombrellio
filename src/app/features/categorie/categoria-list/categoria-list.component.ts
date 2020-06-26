import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCategoria from '../store/categoria.reducers';
import * as CategoriaActions from '../store/categoria.actions';

import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CategoriaEditComponent } from '../categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from '../categoria-delete/categoria-delete.component';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  categoriaState: Observable<fromCategoria.State>;
  categorie: Categoria[] = [];

  constructor(private store: Store<fromCategoria.FeatureState>,
              private subService: SubscriptionService,
              private dialog: MatDialog) { }

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

  editCateogoria(categoria) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = categoria;
    this.dialog.open(CategoriaEditComponent, dialogConfigDel);
  }

  deleteCateogoria(categoria) {
    const dialogConfigDel = new MatDialogConfig();
    dialogConfigDel.disableClose = true;
    dialogConfigDel.autoFocus = true;
    dialogConfigDel.width = '30rem';
    dialogConfigDel.data = categoria;
    this.dialog.open(CategoriaDeleteComponent, dialogConfigDel);
  }

  onChangeCategoriaVisibile(categoria, visibile) {
    categoria.visibile = visibile;
    this.store.dispatch(new CategoriaActions.UpdateCategoria(categoria));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}

