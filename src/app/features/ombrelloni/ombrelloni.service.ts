import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Ombrellone } from './ombrelloni.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../login/store/auth.reducers';
import * as AuthActions from '../login/store/auth.actions';
import { Auth } from 'src/app/core/model/auth.model';


@Injectable()

export class OmbrelloniService {

    authUID: string;

    constructor(private db: AngularFirestore,
                private store: Store<fromApp.AppState>) {
                  this.store.select(fromApp.getAuthUID).subscribe(res => this.authUID = res);
                }

    getAll(): Observable<Ombrellone[]> {

      let ombrelloni = this.db.collection<Ombrellone>('ombrellone');

      ombrelloni = this.db.collection<Ombrellone>('ombrellone', ref =>
        ref.where('utente_uid', '==', this.authUID)
          .orderBy('created_at', 'desc').limit(2)
      );

      return ombrelloni.snapshotChanges().pipe(
                map((actions => actions.map(a => {
                  const data = a.payload.doc.data() as Ombrellone;
                  const id = a.payload.doc.id;
                  return { id, ...data };
                })))
              );
    }

    getOmbrellone(idOmbrellone: string): Observable<Ombrellone> {
        const ref = this.db.doc<Ombrellone>('ombrellone/' + idOmbrellone);
        return ref.valueChanges();
    }

    getCountOmbrelloni() {
        return this.db.collection('utenti')
                .doc(this.authUID)
                .collection('--stats--')
                .doc('countombrellone')
                .valueChanges();

    }

    createOmbrellone(ombrellone: Ombrellone) {
      return this.db.collection('ombrellone').add(ombrellone);
    }

    updateOmbrellone(ombrellone: Ombrellone) {
      return this.db.collection('ombrellone').doc(ombrellone.id).update(ombrellone)
    }

    deleteOmbrellone(ombrelloneId) {
      return this.db.collection('ombrellone').doc(ombrelloneId).delete();
    }

}

