import { Component, OnInit, Inject } from '@angular/core';
import { Attrezzatura } from '../attrezzatura.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AttrezzaturaListComponent } from '../attrezzatura-list/attrezzatura-list.component';

@Component({
  selector: 'app-attrezzatura-detail',
  templateUrl: './attrezzatura-detail.component.html',
  styleUrls: ['./attrezzatura-detail.component.css']
})
export class AttrezzaturaDetailComponent implements OnInit {

  attrezzatura: Attrezzatura;

  constructor(public dialogRef: MatDialogRef<AttrezzaturaListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Attrezzatura) {
                this.attrezzatura = data;
              }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
