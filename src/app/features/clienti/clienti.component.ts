import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as clientiState from './store/clienti.state';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  clientiState: Observable<clientiState.default>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.clientiState = this.store.select('clienti');
  }

}
