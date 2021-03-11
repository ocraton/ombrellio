import * as AuthActions from '../login/store/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chalet } from './chalet.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


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
          .orderBy('created_at', 'desc').limit(1)
      );

      return chalets.snapshotChanges().pipe(
                map((actions => actions.map(a => {
                  const data = a.payload.doc.data() as Chalet;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                })))
              );
    }

    createChalet(chalet, numOmbrelloni, numeroTavoli) {
      delete chalet.id;
      return this.db.collection('chalet').add(chalet)
        .then((chaletItem) => {

            for(let i = 1; i<=numOmbrelloni; i++){
              this.db.collection(`chalet/${chaletItem.id}/ombrelloni`).add({
                'numero': i.toString()
              })
            }
            for (let i = 1; i <= numeroTavoli; i++){
              this.db.collection(`chalet/${chaletItem.id}/tavoli`).add({
                'numero': i.toString()
              })
            }
            this.db.collection('utenti').doc(this.authUID).update({
              'chalet_uid': chaletItem.id
            })

            this.db.collection(`codiciChalet/${chaletItem.id}`).add({ 'codice': ''})

            this.store.dispatch(AuthActions.SetChaletUID({payload: chaletItem.id}))
        });

    }

    updateChalet(chalet: Chalet) {
      this.db.doc(`codiciChalet/${chalet.id}`).set({codice: chalet.codice_accesso})
      let id = chalet.id;
      delete chalet.id;
      return this.db.doc(`chalet/${id}`).update(chalet)
    }

    checkUniqueCode(codice_accesso){
      return this.db.collection('codiciChalet', ref =>
        ref.where('codice', '==', codice_accesso).limit(500)
      ).valueChanges();
    }

}

