import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCategoria from './store/categoria.reducers';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categoriaState: Observable<fromCategoria.State>;
  constructor(private store: Store<fromCategoria.FeatureState>) { }

  ngOnInit() {
    this.categoriaState = this.store.select('categorie');
  }

}
