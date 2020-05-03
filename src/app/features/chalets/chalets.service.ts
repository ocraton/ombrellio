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

    getAll(chaletListParam): Observable<Chalet[]> {

      let chalets = this.db.collection<Chalet>('chalet');

      if (chaletListParam.event === '') {
        chalets = this.db.collection<Chalet>('chalet', ref =>
          ref.where('utente_uid', '==', this.authUID)
            .orderBy('created_at', 'desc').limit(chaletListParam.pageSize)
        );
      }
      if (chaletListParam.event === 'prev') {
        chalets = this.db.collection<Chalet>('chalet', ref =>
          ref.where('utente_uid', '==', this.authUID)
            .orderBy('created_at', 'desc')
            .endBefore(chaletListParam.firstItem.created_at)
            .limitToLast(chaletListParam.pageSize)
        );
      }
      if (chaletListParam.event === 'next') {
          chalets = this.db.collection<Chalet>('chalet', ref =>
            ref.where('utente_uid', '==', this.authUID)
              .orderBy('created_at', 'desc')
              .startAfter(chaletListParam.lastVisibleItem.created_at)
              .limit(chaletListParam.pageSize)
        );
      }
      if (chaletListParam.event === 'search') {
        chalets = this.db.collection<Chalet>('chalet', ref =>
          ref.where('utente_uid', '==', this.authUID)
            .where('ragione_sociale', '>=', chaletListParam.termSearch).where('ragione_sociale', '<=', chaletListParam.termSearch + '\uf8ff')
            .limit(20)
        );
      }
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

    // updateChalet(idChalet: number, chalet: Chalet) {

    // }

    deleteChalet(chaletId) {
      return this.db.collection('chalet').doc(chaletId).delete();
    }

}

