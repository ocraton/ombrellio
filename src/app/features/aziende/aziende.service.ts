import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Azienda } from './azienda.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../features/login/store/auth.reducers';
import * as AuthActions from '../../features/login/store/auth.actions';
import { Auth } from 'src/app/core/model/auth.model';


@Injectable()

export class AziendeService {

    authUID: string;

    constructor(private db: AngularFirestore,
                private store: Store<fromApp.AppState>) {
                  this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
                }

    getAll(aziendaListParam): Observable<Azienda[]> {

      let aziende = this.db.collection<Azienda>('aziende');

      if (aziendaListParam.event === '') {
        aziende = this.db.collection<Azienda>('aziende', ref =>
          ref.where('uid_utente', '==', this.authUID)
            .orderBy('created_at', 'desc').limit(aziendaListParam.pageSize)
        );
      }
      if (aziendaListParam.event === 'prev') {
        aziende = this.db.collection<Azienda>('aziende', ref =>
          ref.where('uid_utente', '==', this.authUID)
            .orderBy('created_at', 'desc')
            .endBefore(aziendaListParam.firstItem.created_at)
            .limitToLast(aziendaListParam.pageSize)
        );
      }
      if (aziendaListParam.event === 'next') {
          aziende = this.db.collection<Azienda>('aziende', ref =>
            ref.where('uid_utente', '==', this.authUID)
              .orderBy('created_at', 'desc')
              .startAfter(aziendaListParam.lastVisibleItem.created_at)
              .limit(aziendaListParam.pageSize)
        );
      }
      if (aziendaListParam.event === 'search') {
        aziende = this.db.collection<Azienda>('aziende', ref =>
          ref.where('uid_utente', '==', this.authUID)
            .where('ragione_sociale', '>=', aziendaListParam.termSearch).where('ragione_sociale', '<=', aziendaListParam.termSearch + '\uf8ff')
            .limit(20)
        );
      }
      return aziende.snapshotChanges().pipe(
                map((actions => actions.map(a => {
                  const data = a.payload.doc.data() as Azienda;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                })))
              );
    }

    getAzienda(idAzienda: string): Observable<Azienda> {
        const ref = this.db.doc<Azienda>('aziende/' + idAzienda);
        return ref.valueChanges();
    }

    getCountAziende() {
        return this.db.collection('utenti')
                .doc(this.authUID)
                .collection('--stats--')
                .doc('countaziende')
                .valueChanges();

    }

    createAzienda(azienda: Azienda) {
      return this.db.collection('aziende').add(azienda);
    }

    // updateAzienda(idAzienda: number, azienda: Azienda) {

    // }

    deleteAzienda(aziendaId) {
      return this.db.collection('aziende').doc(aziendaId).delete();
    }

}

