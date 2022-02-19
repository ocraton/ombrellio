import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Listino } from './listino.model';



@Injectable()

export class ListinoService {

  chaletUID: string;
  authUID: string;

  constructor(private db: AngularFirestore,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
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

  createListino(numeroMese: number, valori: any[]) {
    var lastday = function (y, m) {
      return new Date(y, m, 0).getDate();
    }
    return this.db.collection(`chalet/${this.chaletUID}/listino`).add({
      numero_mese: numeroMese,
      prezzi: {
        1: {
          prezzo: parseFloat(valori['prezzo_range_1']),
          range_inizio: 1,
          range_fine: 8,
        },
        2: {
          prezzo: parseFloat(valori['prezzo_range_2']),
          range_inizio: 9,
          range_fine: 20,
        },
        3: {
          prezzo: parseFloat(valori['prezzo_range_3']),
          range_inizio: 21,
          range_fine: lastday(new Date().getFullYear(), numeroMese),
        },
      }
    });
  }

  updateListino(idlistinoMese: string, numeroMese: number, valori: any[]) {
    var lastday = function (y, m) {
      return new Date(y, m, 0).getDate();
    }
    return this.db.collection(`chalet/${this.chaletUID}/listino`).doc(idlistinoMese).update({
      prezzi: {
          1: {
            prezzo: parseFloat(valori['prezzo_range_1']),
            range_inizio: 1,
            range_fine: 8,
          },
          2: {
            prezzo: parseFloat(valori['prezzo_range_2']),
            range_inizio: 9,
            range_fine: 20,
          },
          3: {
            prezzo: parseFloat(valori['prezzo_range_3']),
            range_inizio: 21,
            range_fine: lastday(new Date().getFullYear(), numeroMese),
          },
      }
    });
  }

}

