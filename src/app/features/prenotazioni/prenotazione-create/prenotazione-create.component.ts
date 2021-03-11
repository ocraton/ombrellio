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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioniClienti());
    this.store.select('prenotazioni').subscribe(res => {
      this.dataSource.data = res.clienti as Cliente[]
    })
    this.prenotazioniState = this.store.select('prenotazioni');
  }


  prenotaOmbrellone(){
    var ombrellone: Ombrellone = this.data.ombrellone
    var cliente: Cliente = this.clientePren
    var rangeDate: any = this.data.rangeDate
    this.store.dispatch(PrenotazioniActions.CreatePrenotazione({ ombrellone, cliente, rangeDate}));
    this.store.dispatch(PrenotazioniActions.FetchPrenotazioni({
      startDate: rangeDate.dataInizio, endDate: rangeDate.dataFine
    }));
    this.store.select('prenotazioni').subscribe(res => {
      this.prenotazioneEffettuata = true
    })
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

  removeCliente(){
    this.clientePren = null
    this.dataSource.filter = '';
  }

  ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

}
