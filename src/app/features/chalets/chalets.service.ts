import * as AuthActions from '../login/store/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Chalet } from './chalet.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';


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

    createChalet(chalet, numOmbrelloni) {

      return this.db.collection('chalet').add(chalet)
        .then((chalet) => {

            for(let i = 1; i<=numOmbrelloni; i++){
              this.db.collection(`chalet/${chalet.id}/ombrelloni`).add({
                'numero': i
              })
            }
            this.db.collection('chalet').doc(chalet.id).update({
              'id': chalet.id
            })
            this.db.collection('utenti').doc(this.authUID).update({
              'chalet_uid': chalet.id
            })

            this.store.dispatch(new AuthActions.SetChaletUID(chalet.id))
        });

    }

    updateChalet(chalet: Chalet) {
      return this.db.doc(`chalet/${chalet.id}`).update(chalet)
    }



}

