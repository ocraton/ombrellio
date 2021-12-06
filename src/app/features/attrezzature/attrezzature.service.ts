import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Attrezzatura } from './attrezzatura.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';


@Injectable()

export class AttrezzatureService {

  chaletUID: string;

  constructor(private db: AngularFirestore,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

  getAll(): Observable<Attrezzatura[]> {

    let attrezzature = this.db.collection(`chalet/${this.chaletUID}/attrezzature`, ref =>
      ref.orderBy('ordinamento').limit(20)
    );

    return attrezzature.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Attrezzatura;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }

  createAttrezzatura(attrezzatura: Attrezzatura) {
    return this.db.collection(`chalet/${this.chaletUID}/attrezzature`).add(attrezzatura)
  }

  updateAttrezzature(attrezzature: Attrezzatura[]) {
    attrezzature.forEach(cat => {
      this.db.doc(`chalet/${this.chaletUID}/attrezzature/${cat.id}`)
        .update({ ordinamento: cat.ordinamento })
    })
    return this.db.collection(`chalet/${this.chaletUID}/attrezzature`).valueChanges()
  }

  updateAttrezzatura(attrezzatura: Attrezzatura) {
    this.db.doc(`chalet/${this.chaletUID}/attrezzature/${attrezzatura.id}`)
      .set({ nome: attrezzatura.nome, visibile: attrezzatura.visibile }, { merge: true })

    return this.db.doc(`chalet/${this.chaletUID}/attrezzature/${attrezzatura.id}`).valueChanges()
  }

  getAttrezzaturaProdotti(attrezzatura) {
    return this.db.collection(`chalet/${this.chaletUID}/prodotti`, ref =>
      ref.where('attrezzatura_uid', '==', attrezzatura.id).limit(1)
    ).valueChanges()
  }

  deleteAttrezzatura(attrezzatura) {
    return this.db.doc(`chalet/${this.chaletUID}/attrezzature/${attrezzatura.id}`).delete()
  }

}
