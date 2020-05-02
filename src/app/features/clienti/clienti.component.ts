import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCliente from './store/cliente.reducers';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit {
 
  clienteState: Observable<fromCliente.State>;  
  constructor(private store: Store<fromCliente.FeatureState>) { }

  ngOnInit() {
    this.clienteState = this.store.select('clienti');
  }

}
