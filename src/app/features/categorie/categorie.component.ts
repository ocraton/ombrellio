import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as categorieState from './store/categorie.state';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  categoriaState: Observable<categorieState.default>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.categoriaState = this.store.select('categorie');
  }

}
