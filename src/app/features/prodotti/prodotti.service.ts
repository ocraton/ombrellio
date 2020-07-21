import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prodotto } from './prodotto.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { Categoria } from '../categorie/categoria.model';


@Injectable()

export class ProdottiService {

  chaletUID: string;

  constructor(private db: AngularFirestore,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

  getOneAtLeast(): Observable<Prodotto[]> {

    let prodotti = this.db.collection(`chalet/${this.chaletUID}/prodotti`, ref =>
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

  getAllProdottiCategorie(): Observable<Categoria[]> {

    let categorie = this.db.collection(`chalet/${this.chaletUID}/categorie`, ref =>
      ref.orderBy('ordinamento').limit(20)
    );

    return categorie.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Categoria;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }

  getProdottiByCategory(categoria) {

    let prodotti = this.db.collection(`chalet/${this.chaletUID}/prodotti`, ref =>
      ref.where('categoria_uid', '==', categoria.id).orderBy('nome').limit(60)
    );

    return prodotti.snapshotChanges().pipe(
      map((actions => actions.map(a => {
        const data = a.payload.doc.data() as Prodotto;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
    );
  }

  createProdotto(prodotto: Prodotto) {
    delete prodotto.id;
    return this.db.collection(`chalet/${this.chaletUID}/prodotti`).add(prodotto)
  }

  updateProdotto(prodotto: Prodotto) {
    let id = prodotto.id;
    delete prodotto.id;
    this.db.doc(`chalet/${this.chaletUID}/prodotti/${id}`).update(prodotto)
    return this.db.doc(`chalet/${this.chaletUID}/categorie/${id}`).valueChanges()
  }

  deleteProdotto(prodotto) {
    return this.db.doc(`chalet/${this.chaletUID}/prodotti/${prodotto.id}`).delete()
  }

}
