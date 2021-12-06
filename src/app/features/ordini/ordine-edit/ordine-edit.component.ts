import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ordiniState from '../store/ordini.state';
import * as fromApp from '../../../store/app.reducer';
import * as OrdiniActions from '../store/ordini.actions';
import { Ordine } from '../ordini.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordine-edit',
  templateUrl: './ordine-edit.component.html',
  styleUrls: ['./ordine-edit.component.scss']
})
export class OrdineEditComponent implements OnInit {

  @Input() ordine: Ordine;
  ordineState: Observable<ordiniState.default>;
  panelOpenState = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ordine.contenuto.sort((a, b) => { return a['portata'] - b['portata'] })
  }


  onSave() {
    this.store.dispatch(OrdiniActions.UpdateOrdine({payload: this.ordine}));
  }

  onChangeVerificato(verificato) {
    this.ordine.verificato = verificato.checked;
    this.onSave();
  }

  onSelectionConsegnato(event) {
    event.value.consegnato = event.selected; //modifico la proprietà dell'oggetto prodotto
    this.onSave();
  }

  chiudiOrdine(){
    this.ordine.completato = true;
    this.ordine.annullato = false;
    this.onSave();
  }

  printOrdine(ordineid) {
    var divToPrint = document.getElementById(ordineid);
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write(`<html>
    <style>
    @media print {
        h2 { color: #c6c6c6;}
    }
    </style>
    <body onload="window.print()">
    ${divToPrint.innerHTML}
    </body></html>`);
    newWin.document.close();
    setTimeout(function () {
      newWin.close();
    }, 10);
  }

  recuperaOrdine(){
    this.ordine.completato = false;
    this.ordine.annullato = false;
    this.onSave();
  }

  annullaOrdine() {
    this.ordine.annullato = true;
    this.onSave();
  }

}
