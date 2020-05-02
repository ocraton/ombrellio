import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromAzienda from '../store/azienda.reducers';
import * as AziendaActions from '../store/azienda.actions';
import { Azienda } from '../azienda.model';

@Component({
  selector: 'app-azienda-detail',
  templateUrl: './azienda-detail.component.html',
  styleUrls: ['./azienda-detail.component.css']
})
export class AziendaDetailComponent implements OnInit {

  id: number;
  aziendaState: Observable<fromAzienda.State>;
  azienda: Azienda;

  constructor(private store: Store<fromAzienda.FeatureState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
      }
    );
    
    this.store.dispatch(new AziendaActions.FetchAzienda({ idAzienda: this.id.toString() }));       
    this.aziendaState = this.store.select('aziende'); 
  }



}
