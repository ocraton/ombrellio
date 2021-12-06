import { Component, ElementRef, Inject, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-prenotazione-create',
  templateUrl: './prenotazione-create.component.html',
  styleUrls: ['./prenotazione-create.component.scss']
})
export class PrenotazioneCreateComponent implements OnInit, OnDestroy {

  searched = false;
  prenotazioniState: Observable<prenotazioniState.default>;
  @ViewChild('searchbox') searchbox: ElementRef<HTMLInputElement>
  clienti: Cliente = null;
  clientePren: Cliente = null;
  displayedColumns: string[] = ['nome', 'cognome', 'telefono', 'email', 'action'];
  dataSource = new MatTableDataSource<Cliente>();
  prenotazioneEffettuata = false;
  isPagato = false;
  acconto = 0;
  prezzo = 0;
  note = '';
  attrezzatureArray = [];
  pagamentiForm: FormGroup;

  @ViewChild(MatSort, { static: false })
  set sort(v: MatSort) {
    this.dataSource.sort = v;
  }
  @ViewChild(MatPaginator, { static: false })
  set paginator(v: MatPaginator) {
    this.dataSource.paginator = v;
  }

  constructor(
    private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<PrenotazioneCreateComponent>,
    private subService: SubscriptionService,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniClienti());
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniAttrezzature());
    this.store.select('prenotazioni').subscribe(res => {
      this.dataSource.data = res.clienti as Cliente[];
    })
    this.prenotazioniState = this.store.select('prenotazioni');
    this.initFormPagamenti();
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
    var acconto = this.acconto;
    this.prezzo = this.pagamentiForm.get('prezzoForm').value;
    var prezzo = this.prezzo;
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

  initFormPagamenti() {
    this.pagamentiForm = this.fb.group({
      'prezzoForm': [null, Validators.pattern('^\\d*(\\,\\d{1,2})?$')],
      'accontoForm': [null, Validators.pattern('^\\d*(\\,\\d{1,2})?$')],
      'noteForm': [''],
    });
  }

  attrezzaturaAddRemove(attrezzatura: any, action_type){

    if (attrezzatura.quantita == null) { attrezzatura.quantita = 0;}

    switch (action_type) {
      case "add":
        attrezzatura.quantita++;
        break;

      case "remove":
        attrezzatura.quantita--;
        break;

      default:
        break;
    }

    const index = this.attrezzatureArray.findIndex((e) => e.id === attrezzatura.id);

    if (index === -1) {
      this.attrezzatureArray.push(attrezzatura);
    } else {
      this.attrezzatureArray[index] = attrezzatura;
    }

  }

  closePrenCreate(): void {
    this.dialogRef.close();
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
