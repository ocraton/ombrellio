import { Component, OnInit, Inject } from '@angular/core';
import { Mansione } from '../mansione.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MansioneListComponent } from '../mansione-list/mansione-list.component';

@Component({
  selector: 'app-mansione-detail',
  templateUrl: './mansione-detail.component.html',
  styleUrls: ['./mansione-detail.component.css']
})
export class MansioneDetailComponent implements OnInit {

  mansione: Mansione;

  constructor(public dialogRef: MatDialogRef<MansioneListComponent>,
              @Inject(MAT_DIALOG_DATA) data: Mansione) {
                this.mansione = data;
              }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
