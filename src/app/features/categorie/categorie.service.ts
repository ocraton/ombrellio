import * as AuthActions from '../login/store/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Categoria } from './categoria.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';


@Injectable()

export class CategorieService {

    chaletUID: string;

    constructor(private db: AngularFirestore,
                private store: Store<fromApp.AppState>) {
                    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
                }

    getAll(): Observable<Categoria[]> {

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

    createCategoria(categoria: Categoria){
      return this.db.collection(`chalet/${this.chaletUID}/categorie`).add(categoria)
    }

    updateCategorie(categorie: Categoria[]){

      categorie.forEach(cat => {
          this.db.doc(`chalet/${this.chaletUID}/categorie/${cat.id}`)
            .update({ ordinamento: cat.ordinamento })
      })
      return this.db.collection(`chalet/${this.chaletUID}/categorie`).valueChanges()
    }

}
