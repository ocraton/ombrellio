import { element } from 'protractor';
import { Component, ElementRef, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as prenotazioniState from '../store/prenotazioni.state';
import * as fromApp from '../../../store/app.reducer';
import * as PrenotazioniActions from '../store/prenotazioni.actions';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Prenotazione } from '../prenotazione.model';
import { Observable } from 'rxjs';
import { Cliente } from '../../clienti/cliente.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ombrellone } from '../../ombrelloni/ombrellone.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attrezzatura } from './../../attrezzature/attrezzatura.model';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

export interface OmbrelloneSelezionato {
  dataInizio: Date;
  dataFine: Date;
  uidOmbrellone: string;
  numeroOmbrellone: string;
}

@Component({
  selector: 'app-prenotazione-create',
  templateUrl: './prenotazione-create.component.html',
  styleUrls: ['./prenotazione-create.component.scss']
})
export class PrenotazioneCreateComponent implements OnInit, OnDestroy {

  searched = false;
  prenotazioniState: Observable<prenotazioniState.default>;
  clienti: Cliente = null;
  clientePren: Cliente = null;
  displayedColumns: string[] = ['nome', 'cognome', 'telefono', 'email', 'action'];
  dataSource = new MatTableDataSource<Cliente>();
  prenotazioneEffettuata = false;
  modificaPrenotazioneEffettuata = false;
  isPagato = false;
  isStagionale = false;
  editFromListView = false;
  acconto = 0;
  prezzo = 0;
  note = '';
  attrezzatureArray = [];
  pagamentiForm: FormGroup;
  visibleFormCreaCliente = false;
  idPrenModifica = null;
  prenotazioneSmart = false;
  prenRangeGiorniOmbrelloni: OmbrelloneSelezionato[] = [];

  @ViewChild(MatSort, { static: false })
  set sort(v: MatSort) {
    this.dataSource.sort = v;
  }
  @ViewChild(MatPaginator, { static: false })
  set paginator(v: MatPaginator) {
    this.dataSource.paginator = v;
  }
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<PrenotazioneCreateComponent>,
    private dialogRefAll: MatDialog,
    private router: Router,
    private subService: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniClienti());
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniAttrezzature());
    this.store.select('prenotazioni').subscribe(res => {
      this.dataSource.data = res.clienti as Cliente[];
      if (this.data.idPrenotazione) { // modifica prenotazione
        if (this.data.editFromListView) this.editFromListView = true;
        var prenazioneDaModificare = res.prenotazione.filter(prenEdit => prenEdit.id == this.data.idPrenotazione);
        this.initClienteModifica(this.dataSource.data);
        this.initFormPagamenti(prenazioneDaModificare[0]?.prezzo, prenazioneDaModificare[0]?.acconto, prenazioneDaModificare[0]?.note);
        this.idPrenModifica = prenazioneDaModificare[0]?.id;
        prenazioneDaModificare[0]?.attrezzature.forEach(attrezzatura => {
          attrezzatura.id = attrezzatura.attrezzaturaUid;
          const index = this.attrezzatureArray.findIndex((e) => e.id === attrezzatura.id);
          if (index === -1) {
            this.attrezzatureArray.push(attrezzatura);
          } else {
            this.attrezzatureArray[index] = attrezzatura;
          }
        });
        this.isPagato = (typeof (prenazioneDaModificare[0]?.is_pagato) == 'undefined') ? false : prenazioneDaModificare[0]?.is_pagato;
        this.isStagionale = (typeof (prenazioneDaModificare[0]?.is_stagionale) == 'undefined') ? false : prenazioneDaModificare[0]?.is_stagionale;
      } else { // nuova prenotazione
        this.initFormPagamenti(null, null, '');
        if (this.data.prenotazioneSmart){
          this.prenotazioneSmart = this.data.prenotazioneSmart;
          this.prenRangeGiorniOmbrelloni = this.data.prenRangeGiorniOmbrelloni;
        }
      }
    })
    this.prenotazioniState = this.store.select('prenotazioni');
  }


  prenotaOmbrellone(){
    var cliente: Cliente = this.clientePren
    this.attrezzatureArray.forEach(element => {
      element.attrezzaturaUid = element.id;
      delete element.id;
      delete element.ordinamento;
      delete element.visibile;
    })
    var attrezzature = this.attrezzatureArray;
    var isPagato = this.isPagato;
    var isStagionale = this.isStagionale;
    this.acconto = this.pagamentiForm.get('accontoForm').value;
    var acconto: number = this.acconto;
    this.prezzo = this.pagamentiForm.get('prezzoForm').value;
    var prezzo: number = this.prezzo;
    this.note = this.pagamentiForm.get('noteForm').value;
    var note = this.note;
    var rangeDate: any = this.data.rangeDate;
    if (!this.prenotazioneSmart){
      var ombrellone: Ombrellone = this.data.ombrellone;
      this.store.dispatch(PrenotazioniActions.CreatePrenotazione({
        ombrellone, cliente, rangeDate, attrezzature, isPagato, isStagionale, acconto, prezzo, note
      }));
    } else {
      let prezzoGiornaliero = 0;
      let accontoGiornaliero = 0;
      if(prezzo != null || prezzo != 0){
        prezzoGiornaliero = prezzo / this.data.numeroGiorniPrenotazione;
        accontoGiornaliero = acconto / this.data.numeroGiorniPrenotazione;
      }
      for (let index = 0; index < this.prenRangeGiorniOmbrelloni.length; index++) {
          const item = this.prenRangeGiorniOmbrelloni[index];
          let ombrellone = { id: item.uidOmbrellone, numero: item.numeroOmbrellone, colonna: 0, riga: 0 };
          let rangeDate: any = { dataInizio: item.dataInizio, dataFine: item.dataFine };
          let giorniRange = this.numeroGiorniTra2Date(item.dataInizio, item.dataFine) + 1;
          let prezzo = prezzoGiornaliero * giorniRange;
          let acconto = accontoGiornaliero * giorniRange;
          this.store.dispatch(PrenotazioniActions.CreatePrenotazione({
            ombrellone, cliente, rangeDate, attrezzature, isPagato, isStagionale, acconto, prezzo, note
          }));
      }
      this.store.select('prenotazioni').subscribe(() => {
        this.prenotazioneEffettuata = true
      });
      return this.router.navigate(['/user/prenotazioni']);
    }
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: rangeDate.dataInizio, endDate: rangeDate.dataFine
    }));
    this.store.select('prenotazioni').subscribe(() => {
      this.prenotazioneEffettuata = true
    })
  }

  modificaPrenotazioneOmbrellone(){
    var ombrellone: Ombrellone = this.data.ombrellone;
    var cliente: Cliente = this.clientePren;
    var rangeDate: any = this.data.rangeDate;
    var dataPrenotazione: any = this.data.data_prenotazione;
    var attrezzature = this.attrezzatureArray;
    var isPagato = this.isPagato;
    var isStagionale = this.isStagionale;
    this.acconto = this.pagamentiForm.get('accontoForm').value;
    var acconto = this.acconto;
    this.prezzo = this.pagamentiForm.get('prezzoForm').value;
    var prezzo = this.prezzo;
    this.note = this.pagamentiForm.get('noteForm').value;
    var note = this.note;
    var idPrenotazione = this.idPrenModifica;
    this.store.dispatch(PrenotazioniActions.UpdatePrenotazione({ idPrenotazione, ombrellone, cliente, rangeDate, dataPrenotazione, attrezzature, isPagato, isStagionale, acconto, prezzo, note }));
    if (this.editFromListView){
      this.store.dispatch(PrenotazioniActions.FetchPrenotazioniLista());
    } else {
      this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
        startDate: this.data.rangeDateForm.dataInizio, endDate: this.data.rangeDateForm.dataFine
      }));
    }
    this.store.select('prenotazioni').subscribe(() => {
      this.prenotazioneEffettuata = true
      this.modificaPrenotazioneEffettuata = true
    })
  }

  numeroGiorniTra2Date(dataInizio, dataFine) {
    let sogliaCalc = (dataFine.getTime()
      - dataInizio.getTime()) / (1000 * 3600 * 24);
    return sogliaCalc;
  }

  checkAttrezzaturaQuantitaValueById(idAttrezzatura) {
    let attrezzatura = this.attrezzatureArray.filter(a => a.id == idAttrezzatura);
    let val = (typeof (attrezzatura[0]?.quantita) == 'undefined') ? 0 : attrezzatura[0]?.quantita;
    return val;
  }

  initClienteModifica(clienteEdit){
    let clienteModifica = clienteEdit.filter(cliente => {
      return cliente.id == this.data.idCliente
    });
    this.clientePren = clienteModifica[0];
  }

  initFormPagamenti(prezzoForm, accontoForm, noteForm) {

    this.pagamentiForm = this.fb.group({
      'prezzoForm': [prezzoForm, Validators.compose([Validators.pattern('^\\d*(\\.\\d{1,2})?$')])],
      'accontoForm': [accontoForm, Validators.compose([Validators.pattern('^\\d*(\\.\\d{1,2})?$')])],
      'noteForm': [noteForm],
    });
  }

  attrezzaturaAddRemove(attrezzatura: any, action_type){

    const index = this.attrezzatureArray.findIndex((e) => e.id === attrezzatura.id);

    if (attrezzatura.quantita == null) { attrezzatura.quantita = 0;}

    switch (action_type) {
      case "add":
        if (index === -1) {
          attrezzatura.quantita++;
          this.attrezzatureArray.push(attrezzatura);
        } else {
          this.attrezzatureArray[index].quantita++;
        }
        break;

      case "remove":
        if (index === -1) {
          attrezzatura.quantita++;
          this.attrezzatureArray.push(attrezzatura);
        } else {
          this.attrezzatureArray[index].quantita--;
        }
        break;

      default:
        break;
    }

  }

  showFormCliente() {
    this.visibleFormCreaCliente = !this.visibleFormCreaCliente
  }

  closePrenCreate(): void {
    this.dialogRefAll.closeAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectCliente(cliente) {
    this.clientePren = cliente
  }

  selectIsPagato(ispagatoval) {
    this.isPagato = ispagatoval.checked;
  }

  selectIsStagionale(isstagionaleval) {
    this.isStagionale = isstagionaleval.checked;
  }

  removeCliente(){
    this.clientePren = null
    this.dataSource.filter = '';
  }

  keyPressNumbersWithDecimal(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
