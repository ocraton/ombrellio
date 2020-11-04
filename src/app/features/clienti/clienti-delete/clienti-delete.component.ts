import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as clientiState from '../store/clienti.state';
import * as fromApp from '../../../store/app.reducer';
import * as ClientiActions from '../store/clienti.actions';
import { Cliente } from '../cliente.model';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientiListComponent } from '../clienti-list/clienti-list.component';

@Component({
  selector: 'app-clienti-delete',
  templateUrl: './clienti-delete.component.html',
  styleUrls: ['./clienti-delete.component.scss']
})
export class ClientiDeleteComponent implements OnInit {

  cliente: Cliente;
  clienti: Cliente[];
  clientiState: Observable<clientiState.default>;
  @ViewChild('formDirective') formDirective;

  constructor(private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<ClientiListComponent>,
    @Inject(MAT_DIALOG_DATA) data: Cliente) {
    this.cliente = data;
  }

  ngOnInit() {
    // this.store.dispatch(new ClienteActions.FetchClientiByCategoria(this.clienti.categoria_uid))
    this.clientiState = this.store.select('clienti')
    this.clientiState.subscribe(res => this.clienti = res.clienti)
  }

  onDelete() {
    this.store.dispatch(ClientiActions.DeleteCliente({payload: this.cliente}));
    this.clienti.map((c, index) => {
      if (c.id == this.cliente.id) {
        this.clienti.splice(index, 1);
      }
    }
    )
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
