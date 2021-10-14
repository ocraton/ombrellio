import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

export interface Allergene {
  id: string,
  descrizione: string;
}

@Injectable()

export class AllergeniService {

  constructor(private db: AngularFirestore) { }

  getAllergeniList() {

    let allergeni = this.db.collection(`allergeni`);

    return allergeni.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Allergene;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }









}
