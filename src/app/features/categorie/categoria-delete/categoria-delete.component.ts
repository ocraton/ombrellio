import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as categorieState from '../store/categorie.state';
import * as fromApp from '../../../store/app.reducer';
import * as CategorieActions from '../store/categorie.actions';
import { Categoria } from '../categoria.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaListComponent } from '../categoria-list/categoria-list.component';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.scss']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria;
  categorie: Categoria[];
  categoriaState: Observable<categorieState.default>;
  @Input() lastCategoria: number;

  constructor(private store: Store<fromApp.AppState>,
              public dialogRef: MatDialogRef<CategoriaListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Categoria) {
                this.categoria = data;
              }

  ngOnInit() {
    this.store.dispatch(CategorieActions.FetchCategoriaProdotti({payload: this.categoria}))
    this.categoriaState = this.store.select('categorie')
    this.categoriaState.subscribe(res => this.categorie = res.categoria)
  }

  onDelete() {
    this.store.dispatch(CategorieActions.DeleteCategoria({payload: this.categoria}));
      this.categorie.map( (c, index) => {
        if (c.id == this.categoria.id) {
          this.categorie.splice(index, 1);
          }
        }
      )
    this.categorie.map((catItem, index) => {
      return catItem.ordinamento = index + 1
    })
    this.store.dispatch(CategorieActions.UpdateCategorie({payload: this.categorie}));
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
