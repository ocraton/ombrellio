import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ombrelloniState from './store/ombrelloni.state';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-ombrelloni',
  templateUrl: './ombrelloni.component.html',
  styleUrls: ['./ombrelloni.component.scss']
})
export class OmbrelloniComponent implements OnInit {

  ombrelloniState: Observable<ombrelloniState.default>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ombrelloniState = this.store.select('ombrelloni');
  }

}
