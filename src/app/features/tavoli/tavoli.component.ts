import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as tavoliState from './store/tavoli.state';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-tavoli',
  templateUrl: './tavoli.component.html',
  styleUrls: ['./tavoli.component.scss']
})
export class TavoliComponent implements OnInit {

  tavoliState: Observable<tavoliState.default>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.tavoliState = this.store.select('tavoli');
  }

}
