import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCliente from '../store/cliente.reducers';
import * as ClienteActions from '../store/cliente.actions';
import { Cliente } from '../cliente.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ClienteListComponent } from '../cliente-list/cliente-list.component';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  
  cliente: Cliente;
  clienteState: Observable<fromCliente.State>;

  constructor(private store: Store<fromCliente.FeatureState>,
              public dialogRef: MatDialogRef<ClienteListComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) data: Cliente) {
                this.cliente = data;
              }

  ngOnInit() {
    this.clienteState = this.store.select('clienti');
  }

  close(): void {
    this.dialogRef.close();
  }

  
  delete(id): void {    
    this.store.dispatch(new ClienteActions.DeleteCliente(id));            
    this.clienteState = this.store.select('clienti');
    this.store.select('clienti').subscribe(
      (clienti) => {                             
        if(!(clienti.error != null)) {
          this.dialogRef.close();
          this.showSuccessMessage("Cliente cancellato con successo");          
        }                
      }
    ).unsubscribe()
  }

  showSuccessMessage(message: string) {  
 
    this._snackBar.open(message, 'OK', {
      duration: 10000,
      horizontalPosition: 'end'
    });

  }

}
