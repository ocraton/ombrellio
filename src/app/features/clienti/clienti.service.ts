import * as AuthActions from '../login/store/auth.actions';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente } from './cliente.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';


@Injectable()

export class ClientiService {

  chaletUID: string;

  constructor(private db: AngularFirestore,
    private store: Store<fromApp.AppState>) {
    this.store.select(fromApp.getAuthChaletUID).subscribe(res => this.chaletUID = res);
  }

    getAll(): Observable<Cliente[]> {

        let clienti = this.db.collection(`chalet/${this.chaletUID}/clienti`, ref =>
          ref.orderBy('nome')
          .limit(1000)
        );

        return clienti.snapshotChanges().pipe(
          map((actions => actions.map(a => {
            const data = a.payload.doc.data() as Cliente;
            const id = a.payload.doc.id;
            return { id, ...data };
          })))
        );

    }

    createCliente(cliente: Cliente) {
      return this.db.collection(`chalet/${this.chaletUID}/clienti`).add(cliente)
    }

    updateCliente(cliente: Cliente) {
      let id = cliente.id;
      delete cliente.id;
      return this.db.doc(`chalet/${this.chaletUID}/clienti/${id}`).update(cliente)
    }

    deleteCliente(cliente) {
      return this.db.doc(`chalet/${this.chaletUID}/clienti/${cliente.id}`).delete()
    }



}

