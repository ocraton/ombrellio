import { Component, OnInit, Inject } from '@angular/core';
import { Requisito } from '../requisito.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RequisitoListComponent } from '../requisito-list/requisito-list.component';

@Component({
  selector: 'app-requisito-detail',
  templateUrl: './requisito-detail.component.html',
  styleUrls: ['./requisito-detail.component.css']
})
export class RequisitoDetailComponent implements OnInit {

  requisito: Requisito;

  constructor(public dialogRef: MatDialogRef<RequisitoListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Requisito) {
                this.requisito = data;
              }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
