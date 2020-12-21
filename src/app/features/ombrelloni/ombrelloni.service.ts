import * as AuthActions from '../login/store/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ombrellone } from './ombrellone.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Injectable()

export class OmbrelloniService {

  chaletUID: string;

  constructor(private db: AngularFirestore,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

    getAll(): Observable<Ombrellone[]> {

        let ombrelloni = this.db.collection(`chalet/${this.chaletUID}/ombrelloni`, ref =>
          ref.limit(1000)
        );

        return ombrelloni.snapshotChanges().pipe(
          map((actions => actions.map(a => {
            const data = a.payload.doc.data() as Ombrellone;
            const id = a.payload.doc.id;
            return { id, ...data };
          })))
        );

    }

    createOmbrellone(ombrellone: Ombrellone) {
      return this.db.collection(`chalet/${this.chaletUID}/ombrelloni`).add(ombrellone)
    }

    updateOmbrellone(ombrellone: Ombrellone) {
      let id = ombrellone.id;
      delete ombrellone.id;
      return this.db.doc(`chalet/${this.chaletUID}/ombrelloni/${id}`).update(ombrellone)
    }

    deleteOmbrellone(ombrellone) {
      return this.db.doc(`chalet/${this.chaletUID}/ombrelloni/${ombrellone.id}`).delete()
    }



}

