import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prodotto } from '../prodotti/prodotto.model';
import { Categoria } from '../categorie/categoria.model';
import { Chalet } from '../chalet/chalet.model';


@Injectable()

export class MenuService {

  constructor(private db: AngularFirestore) {
  }

  getOneAtLeast(chaletUID: string): Observable<Prodotto[]> {

    let prodotti = this.db.collection(`chalet/${chaletUID}/prodotti`, ref =>
      ref.limit(1)
    );

    return prodotti.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Prodotto;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }

  getAllProdottiCategorie(chaletUID): Observable<Categoria[]> {

    let categorie = this.db.collection(`chalet/${chaletUID}/categorie`, ref =>
      ref.where('visibile', '==', true).orderBy('ordinamento').limit(20)
    );

    return categorie.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Categoria;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }

  getProdotti(chaletUID) {

    let prodotti = this.db.collection(`chalet/${chaletUID}/prodotti`, ref =>
      ref.where('visibile', '==', true).orderBy('nome').limit(60)
    );

    return prodotti.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Prodotto;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }

  getChaletInfo(chaletUID) {

    let chalet = this.db.doc(`chalet/${chaletUID}`);

    return chalet.valueChanges()

  }


}
