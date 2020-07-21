import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as chaletState from './store/chalet.state';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-chalet',
  templateUrl: './chalet.component.html',
  styleUrls: ['./chalet.component.scss']
})
export class ChaletComponent implements OnInit {

  chaletState: Observable<chaletState.default>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.chaletState = this.store.select('chalet');
  }

}
