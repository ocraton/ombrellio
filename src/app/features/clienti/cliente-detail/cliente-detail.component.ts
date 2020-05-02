import { Component, OnInit, Inject } from '@angular/core';
import { Cliente } from '../cliente.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClienteListComponent } from '../cliente-list/cliente-list.component';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css']
})
export class ClienteDetailComponent implements OnInit {

  cliente: Cliente;

  constructor(public dialogRef: MatDialogRef<ClienteListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Cliente) {
                this.cliente = data;
              }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
