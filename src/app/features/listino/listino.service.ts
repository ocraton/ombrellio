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

}

