import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Prenotazione } from '../prenotazione.model';

@Component({
  selector: 'app-prenotazione-create',
  templateUrl: './prenotazione-create.component.html',
  styleUrls: ['./prenotazione-create.component.scss']
})
export class PrenotazioneCreateComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PrenotazioneCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  prenotaOmbrellone(){
      console.log(this.data)
  }

  closePrenCreate(): void {
    this.dialogRef.close();
  }

}
