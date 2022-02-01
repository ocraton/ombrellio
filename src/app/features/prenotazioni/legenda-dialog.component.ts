import { Ombrellone } from './../ombrelloni/ombrellone.model';
import { Component, OnInit, OnDestroy } from '@angular/core';




export interface Tile {
  iRiga: number;
  iColonna: number;
  ombrellone: Ombrellone;
}

@Component({
  selector: 'legenda-dialog',
  templateUrl: './legenda-dialog.component.html',
})
export class LegendaDialogComponent implements OnInit {

  ngOnInit() { }

}
