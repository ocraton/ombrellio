import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prenotazione } from './prenotazione.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Ombrellone } from '../ombrelloni/ombrellone.model';
import { DatesService } from 'src/app/shared/services/dates.service';
import { Cliente } from '../clienti/cliente.model';
import { Mappa } from './mappa.model';
import { Attrezzatura } from '../attrezzature/attrezzatura.model';
import { Listino } from '../listino/listino.model';


@Injectable()

export class PrenotazioniService {

  chaletUID: string;
  authUID: string;

  constructor(private db: AngularFirestore,
    private dateservice: DatesService,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

  getAll(startDate: Date, endDate: Date): Observable<Prenotazione[]> {

      startDate = this.dateservice.dateStartBuildGMT1(startDate)
      endDate = this.dateservice.dateEndBuildGMT1(endDate)

      if (startDate.getUTCFullYear() == endDate.getUTCFullYear()) {

          var prenotazioni = this.db.collection(`chalet/${this.chaletUID}/prenotazioni`, ref =>
            ref.where('data_inizio', '<=', endDate)
              .where('anno_inizio', '==', startDate.getFullYear())
              .where('anno_fine', '==', endDate.getFullYear()).limit(10000)
          );

      } else {

        var prenotazioni = this.db.collection(`chalet/${this.chaletUID}/prenotazioni`, ref =>
                ref.where('data_inizio', '<=', endDate)
            .where('anno_fine', '==', endDate.getFullYear()).limit(10000)
        );
        for (let j = startDate.getUTCFullYear(); j < endDate.getUTCFullYear(); j++) {
          prenotazioni.ref.where('anno_inizio', '==', j)
        }

      }

      return prenotazioni.snapshotChanges().pipe(
        map((actions => actions.map(a => {
          const data = a.payload.doc.data() as Prenotazione;
          const id = a.payload.doc.id;
          return { id, ...data };
        }).filter(a =>
          a.data_fine['seconds'] * 1000 >= startDate.getTime()
        )))
      );

  }

  getAllLista(): Observable<Prenotazione[]> {

    let prenotazioni = this.db.collection(`chalet/${this.chaletUID}/prenotazioni`, ref =>
      ref.orderBy('data_prenotazione', 'desc')
        .limit(10000)
    );

    return prenotazioni.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Prenotazione;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );

  }


  getAllOmbrelloni(): Observable<Ombrellone[]> {

    let ombrelloni = this.db.collection(`chalet/${this.chaletUID}/ombrelloni`, ref =>
      ref.orderBy('numero')
      .limit(1000)
    );

    return ombrelloni.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Ombrellone;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );

  }

  getMappa(): Observable<Mappa[]> {

    let mappa = this.db.collection(`chalet/${this.chaletUID}/mappa`, ref =>
      ref.limit(1)
    );

    return mappa.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Mappa;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );

  }

  getClienti(): Observable<Cliente[]> {

    let clienti = this.db.collection(`chalet/${this.chaletUID}/clienti`, ref =>
      ref.orderBy('cognome')
      .limit(3000)
    );

    return clienti.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Cliente;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );

  }

  getAttrezzature(): Observable<Attrezzatura[]> {

    let attrezzature = this.db.collection(`chalet/${this.chaletUID}/attrezzature`, ref =>
      ref.orderBy('ordinamento')
      .limit(100)
    );

    return attrezzature.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Attrezzatura;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );

  }

  getListino(): Observable<Listino[]> {

    let listino = this.db.collection(`chalet/${this.chaletUID}/listino`, ref =>
      ref.limit(20)
    );

    return listino.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Listino;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );

  }

  createCliente(cliente: Cliente) {
    return this.db.collection(`chalet/${this.chaletUID}/clienti`).add(cliente)
  }


  createPrenotazione(ombrellone: Ombrellone, cliente: Cliente, rangeDate: any, attrezzature: any[], isPagato: boolean, isStagionale: boolean, acconto: number, prezzo: number, note: string){
    return this.db.collection(`chalet/${this.chaletUID}/prenotazioni`).add({
      anno_fine: rangeDate.dataFine.getFullYear(),
      anno_inizio: rangeDate.dataInizio.getFullYear(),
      cognome_cliente: cliente.cognome,
      nome_cliente: cliente.nome,
      data_fine: this.dateservice.dateEndBuildGMT1(rangeDate.dataFine),
      data_inizio: this.dateservice.dateStartBuildGMT1(rangeDate.dataInizio),
      data_prenotazione: new Date,
      numero_ombrellone: ombrellone.numero,
      uid_ombrellone: ombrellone.id,
      uid_cliente: cliente.id,
      attrezzature: attrezzature,
      is_pagato: isPagato,
      is_stagionale: isStagionale,
      acconto: Number(acconto),
      prezzo: Number(prezzo),
      note: note
    })
  }

  updatePrenotazione(idPrenotazione: string, ombrellone: Ombrellone, cliente: Cliente, rangeDate: any, dataPrenotazione: Date, attrezzature: any[], isPagato: boolean, isStagionale: boolean, acconto: number, prezzo: number, note: string){

    attrezzature = attrezzature.filter(item => item.quantita !== 0);

    attrezzature.slice().forEach(function (item) {
      item.attrezzaturaUid = item.id;
      delete item.id;
      delete item.ordinamento;
      delete item.visibile;
    });

    return this.db.collection(`chalet/${this.chaletUID}/prenotazioni`).doc(idPrenotazione).set({
      anno_fine: rangeDate.dataFine.getFullYear(),
      anno_inizio: rangeDate.dataInizio.getFullYear(),
      cognome_cliente: cliente.cognome,
      nome_cliente: cliente.nome,
      data_fine: this.dateservice.dateEndBuildGMT1(rangeDate.dataFine),
      data_inizio: this.dateservice.dateStartBuildGMT1(rangeDate.dataInizio),
      data_prenotazione: dataPrenotazione,
      numero_ombrellone: ombrellone.numero,
      uid_ombrellone: ombrellone.id,
      uid_cliente: cliente.id,
      attrezzature: attrezzature,
      is_pagato: isPagato,
      is_stagionale: isStagionale,
      acconto: Number(acconto),
      prezzo: Number(prezzo),
      note: note
    })
  }

  deletePrenotazione(uid_prenotazione) {
    return this.db.doc(`chalet/${this.chaletUID}/prenotazioni/${uid_prenotazione}`).delete()
  }


}

