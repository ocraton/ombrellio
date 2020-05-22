import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ordine } from './ordini.model';
import { DatesService } from 'src/app/shared/services/dates.service';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';


@Injectable()

export class OrdiniService {

    chaletUID: string;
    authUID: string;

    constructor(private db: AngularFirestore,
      private dateservice: DatesService,
      private store: Store<fromApp.AppState>) {
      this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
    }

    getAll(orderType = ''): Observable<Ordine[]> {

      const datesCompare = this.dateservice.dateBuildGMT1();

      let completato = (orderType === 'c') ? true : false
      if(orderType === 'a'){
          return this.db.collection(`chalet/${this.chaletUID}/ordini`, ref =>
              ref.where('annullato', '==', true)
                .where('created_at', '>', datesCompare.dateStart)
                .where('created_at', '<', datesCompare.dateEnd)
                .orderBy('created_at', 'desc').limit(100)
          ).snapshotChanges().pipe(
            map((actions => actions.map(a => {
              const data = a.payload.doc.data() as Ordine;
              const id = a.payload.doc.id;
              return { id, ...data };
            })))
          );
      } else {
          return this.db.collection(`chalet/${this.chaletUID}/ordini`, ref =>
              ref.where('completato', '==', completato)
                .where('annullato', '==', false)
                .where('created_at', '>', datesCompare.dateStart)
                .where('created_at', '<', datesCompare.dateEnd)
                .orderBy('created_at', 'desc').limit(100)
          ).snapshotChanges().pipe(
            map((actions => actions.map(a => {
              const data = a.payload.doc.data() as Ordine;
              const id = a.payload.doc.id;
              return { id, ...data };
            })))
          );
      }


    }

    getOrdine(idOrdine: string): Observable<Ordine> {
        const ref = this.db.doc<Ordine>('ordine/' + idOrdine);
        return ref.valueChanges();
    }

    getCountOrdini() {
        return this.db.collection('utenti')
                .doc('')
                .collection('--stats--')
                .doc('countordine')
                .valueChanges();

    }

    updateOrdine(ordine: Ordine) {
      return this.db.collection(`chalet/${this.chaletUID}/ordini`).doc(ordine.id).update(ordine)
    }


}

