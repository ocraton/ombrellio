import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prenotazione } from './prenotazione.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Ombrellone } from '../ombrelloni/ombrellone.model';
import { DatesService } from 'src/app/shared/services/dates.service';


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

      if (startDate.getUTCFullYear() == endDate.getUTCFullYear()) {

          var prenotazioni = this.db.collection(`chalet/${this.chaletUID}/prenotazioni`, ref =>
            ref.where('data_inizio', '<=', endDate)
              .where('anno_inizio', '==', startDate.getFullYear())
              .where('anno_fine', '==', endDate.getFullYear())
          );

      } else {

        var prenotazioni = this.db.collection(`chalet/${this.chaletUID}/prenotazioni`, ref =>
                ref.where('data_inizio', '<=', endDate)
                  .where('anno_fine', '==', endDate.getFullYear())
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


}

