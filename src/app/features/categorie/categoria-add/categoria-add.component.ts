import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as categorieState from '../store/categorie.state';
import * as fromApp from '../../../store/app.reducer';
import * as CategorieActions from '../store/categorie.actions';
import { Categoria } from '../categoria.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.scss']
})
export class CategoriaAddComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: Categoria;
  categoriaState: Observable<categorieState.default>;
  @Input() lastCategoria: number;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.categoriaState = this.store.select('categorie');
  }

  onSave() {
    this.categoria = this.categoriaForm.value;
    this.categoria.ordinamento = this.lastCategoria+1;
    this.categoria.visibile = true;
    this.store.dispatch(CategorieActions.CreateCategoria({payload: this.categoria}));
    this.formDirective.resetForm();
    this.categoriaForm.reset();
    this.categoriaForm.markAsUntouched();
  }

  initForm() {
    let nome = '';
    this.categoriaForm = this.fb.group({
      'nome': [nome, Validators.compose([ Validators.required, Validators.minLength(3) ])]
    });

  }


}
