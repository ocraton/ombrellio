import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCategoria from '../store/categoria.reducers';
import * as CategoriaActions from '../store/categoria.actions';
import { Categoria } from '../categoria.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaListComponent } from '../categoria-list/categoria-list.component';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: Categoria;
  categoriaState: Observable<fromCategoria.State>;
  @Input() lastCategoria: number;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromCategoria.FeatureState>,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<CategoriaListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Categoria) {
                this.categoria = data;
              }

  ngOnInit() {
  }

  onDelete() {
    // this.categoria.nome = this.categoriaForm.get('nome').value;
    // this.store.dispatch(new CategoriaActions.UpdateCategoria(this.categoria));
    // this.categoriaForm.markAsUntouched();
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
