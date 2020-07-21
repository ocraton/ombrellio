import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as categorieState from '../store/categorie.state';
import * as fromApp from '../../../store/app.reducer';
import * as CategorieActions from '../store/categorie.actions';
import { Categoria } from '../categoria.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaListComponent } from '../categoria-list/categoria-list.component';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.scss']
})
export class CategoriaEditComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: Categoria;
  categoriaState: Observable<categorieState.default>;
  @Input() lastCategoria: number;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<CategoriaListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Categoria) {
                this.categoria = data;
              }

  ngOnInit() {
    this.initForm();
  }

  onSave() {
    this.categoria.nome = this.categoriaForm.get('nome').value;
    this.store.dispatch(CategorieActions.UpdateCategoria({payload: this.categoria}));
    this.categoriaForm.markAsUntouched();
    this.dialogRef.close();
  }

  initForm() {
    let nome = this.categoria.nome;
    this.categoriaForm = this.fb.group({
      'nome': [nome, Validators.compose([ Validators.required, Validators.minLength(3) ])]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

}
