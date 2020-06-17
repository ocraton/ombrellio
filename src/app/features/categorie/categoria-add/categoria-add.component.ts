import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromCategoria from '../store/categoria.reducers';
import * as CategoriaActions from '../store/categoria.actions';
import { Categoria } from '../categoria.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  categoriaForm: FormGroup;
  categoria: Categoria;
  categoriaState: Observable<fromCategoria.State>;
  @Input() lastCategoria: number;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromCategoria.FeatureState>,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
    this.categoriaState = this.store.select('categorie');
  }

  onSave() {
    this.categoria = this.categoriaForm.value;
    this.categoria.ordinamento = this.lastCategoria+1;
    this.store.dispatch(new CategoriaActions.CreateCategoria(this.categoria));
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
