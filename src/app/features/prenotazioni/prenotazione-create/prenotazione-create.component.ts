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
  acconto = 0;
  prezzo = 0;
  note = '';
  attrezzatureArray = [];
  pagamentiForm: FormGroup;
  visibleFormCreaCliente = false;
  idPrenModifica = null;

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
    private subService: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniClienti());
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniAttrezzature());
    this.store.select('prenotazioni').subscribe(res => {
      this.dataSource.data = res.clienti as Cliente[];
      if (this.data.idPrenotazione) { // modifica prenotazione
        var prenazioneDaModificare = res.prenotazione.filter(prenEdit => prenEdit.id == this.data.idPrenotazione);
        this.initClienteModifica(this.dataSource.data);
        this.initFormPagamenti(prenazioneDaModificare[0]?.prezzo, prenazioneDaModificare[0]?.acconto, prenazioneDaModificare[0]?.note);
        this.idPrenModifica = prenazioneDaModificare[0]?.id;
        prenazioneDaModificare[0]?.attrezzature.forEach(attrezzatura => {
          const index = this.attrezzatureArray.findIndex((e) => e.id === attrezzatura.id);
          if (index === -1) {
            this.attrezzatureArray.push(attrezzatura);
          } else {
            this.attrezzatureArray[index] = attrezzatura;
          }
        });
        this.isPagato = (typeof (prenazioneDaModificare[0]?.is_pagato) == 'undefined') ? false : prenazioneDaModificare[0]?.is_pagato;
      } else { // nuova prenotazione
        this.initFormPagamenti(null, null, '');
      }
    })
    this.prenotazioniState = this.store.select('prenotazioni');
  }


  prenotaOmbrellone(){
    var ombrellone: Ombrellone = this.data.ombrellone
    var cliente: Cliente = this.clientePren
    var rangeDate: any = this.data.rangeDate
    this.attrezzatureArray.forEach(element => {
      delete element.ordinamento; delete element.visibile;
    })
    var attrezzature = this.attrezzatureArray;
    var isPagato = this.isPagato;
    this.acconto = this.pagamentiForm.get('accontoForm').value;
    var acconto: number = this.acconto;
    this.prezzo = this.pagamentiForm.get('prezzoForm').value;
    var prezzo: number = this.prezzo;
    this.note = this.pagamentiForm.get('noteForm').value;
    var note = this.note;
    this.store.dispatch(PrenotazioniActions.CreatePrenotazione({ ombrellone, cliente, rangeDate, attrezzature, isPagato, acconto, prezzo, note }));
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: rangeDate.dataInizio, endDate: rangeDate.dataFine
    }));
    this.store.select('prenotazioni').subscribe(() => {
      this.prenotazioneEffettuata = true
    })
  }

  modificaPrenotazioneOmbrellone(){
    var ombrellone: Ombrellone = this.data.ombrellone
    var cliente: Cliente = this.clientePren
    var rangeDate: any = this.data.rangeDate
    this.attrezzatureArray.forEach((element, index, object) => {
      delete element.ordinamento; delete element.visibile;
      if (element.quantita == 0) { object.splice(index, 1); }
    })
    var attrezzature = this.attrezzatureArray;
    var isPagato = this.isPagato;
    this.acconto = this.pagamentiForm.get('accontoForm').value;
    var acconto = this.acconto;
    this.prezzo = this.pagamentiForm.get('prezzoForm').value;
    var prezzo = this.prezzo;
    this.note = this.pagamentiForm.get('noteForm').value;
    var note = this.note;
    var idPrenotazione = this.idPrenModifica;
    this.store.dispatch(PrenotazioniActions.UpdatePrenotazione({idPrenotazione, ombrellone, cliente, rangeDate, attrezzature, isPagato, acconto, prezzo, note }));
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: rangeDate.dataInizio, endDate: rangeDate.dataFine
    }));
    this.store.select('prenotazioni').subscribe(() => {
      this.prenotazioneEffettuata = true
      this.modificaPrenotazioneEffettuata = true
    })
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

  removeCliente(){
    this.clientePren = null
    this.dataSource.filter = '';
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
