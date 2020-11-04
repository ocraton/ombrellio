import * as AuthActions from '../login/store/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tavolo } from './tavolo.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Injectable()

export class TavoliService {

  chaletUID: string;

  constructor(private db: AngularFirestore,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

    getAll(): Observable<Tavolo[]> {

        let tavoli = this.db.collection(`chalet/${this.chaletUID}/tavoli`, ref =>
          ref.limit(1000)
        );

        return tavoli.snapshotChanges().pipe(
          map((actions => actions.map(a => {
            const data = a.payload.doc.data() as Tavolo;
            const id = a.payload.doc.id;
            return { id, ...data };
          })))
        );

    }

    createTavolo(tavolo: Tavolo) {
      return this.db.collection(`chalet/${this.chaletUID}/tavoli`).add(tavolo)
    }

    updateTavolo(tavolo: Tavolo) {
      let id = tavolo.id;
      delete tavolo.id;
      return this.db.doc(`chalet/${this.chaletUID}/tavoli/${id}`).update(tavolo)
    }

    deleteTavolo(tavolo) {
      return this.db.doc(`chalet/${this.chaletUID}/tavoli/${tavolo.id}`).delete()
    }



}

