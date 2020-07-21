import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as categorieState from '../store/categorie.state';
import * as fromApp from '../../../store/app.reducer';
import * as CategorieActions from '../store/categorie.actions';

import { SubscriptionService } from 'src/app/core/services/subscription.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CategoriaEditComponent } from '../categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from '../categoria-delete/categoria-delete.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent implements OnInit {

  categoriaState: Observable<categorieState.default>;
  categorie: Categoria[] = [];

  constructor(private store: Store<fromApp.AppState>,
    private subService: SubscriptionService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.store.dispatch(CategorieActions.FetchCategorie());
    this.categoriaState = this.store.select('categorie');
    this.categoriaState.subscribe(cat => this.categorie = cat.categoria)
  }

  drop(event: CdkDragDrop<Categoria[]>) {
    moveItemInArray(this.categorie, event.previousIndex, event.currentIndex);
    this.categorie.map((catItem, index) => {
      return catItem.ordinamento = index + 1
    })
    this.store.dispatch(CategorieActions.UpdateCategorie({payload: this.categorie}));
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
    this.store.dispatch(CategorieActions.UpdateCategoria({payload: categoria}));
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}


