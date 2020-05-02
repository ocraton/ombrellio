import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Risorsaumana } from '../risorsaumana.model';
import { RisorseumaneListComponent } from '../risorseumane-list/risorseumane-list.component';

@Component({
  selector: 'app-risorseumane-detail',
  templateUrl: './risorseumane-detail.component.html',
  styleUrls: ['./risorseumane-detail.component.css']
})
export class RisorseumaneDetailComponent implements OnInit {

  risorsaumana: Risorsaumana;

  constructor(public dialogRef: MatDialogRef<RisorseumaneListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Risorsaumana) {
                this.risorsaumana = data;
              }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }
}
