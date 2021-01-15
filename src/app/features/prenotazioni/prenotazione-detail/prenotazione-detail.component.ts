import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prenotazione } from '../prenotazione.model';

@Component({
  selector: 'app-prenotazione-detail',
  templateUrl: './prenotazione-detail.component.html',
  styleUrls: ['./prenotazione-detail.component.scss']
})
export class PrenotazioneDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PrenotazioneDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prenotazione) { }

  ngOnInit(): void {
  }

  closePrenDetail(): void {
    this.dialogRef.close();
  }

}
