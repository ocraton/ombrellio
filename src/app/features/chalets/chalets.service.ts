import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Chalet } from './chalet.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../login/store/auth.reducers';
import * as AuthActions from '../login/store/auth.actions';
import { Auth } from 'src/app/core/model/auth.model';


@Injectable()

export class ChaletsService {

    authUID: string;

    constructor(private db: AngularFirestore,
                private store: Store<fromApp.AppState>) {
                  this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
                }

    getAll(): Observable<Chalet[]> {

      let chalets = this.db.collection<Chalet>('chalet');

      chalets = this.db.collection<Chalet>('chalet', ref =>
        ref.where('utente_uid', '==', this.authUID)
          .orderBy('created_at', 'desc').limit(2)
      );

      return chalets.snapshotChanges().pipe(
                map((actions => actions.map(a => {
                  const data = a.payload.doc.data() as Chalet;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                })))
              );
    }

    getChalet(idChalet: string): Observable<Chalet> {
        const ref = this.db.doc<Chalet>('chalet/' + idChalet);
        return ref.valueChanges();
    }

    getCountChalets() {
        return this.db.collection('utenti')
                .doc(this.authUID)
                .collection('--stats--')
                .doc('countchalet')
                .valueChanges();

    }

    createChalet(chalet: Chalet) {
      return this.db.collection('chalet').add(chalet);
    }

    updateChalet(chalet: Chalet) {
      return this.db.collection('chalet').doc(chalet.id).update(chalet)
    }

    deleteChalet(chaletId) {
      return this.db.collection('chalet').doc(chaletId).delete();
    }

}

