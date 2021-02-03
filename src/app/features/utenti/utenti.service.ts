import { getAuthUID } from './../../store/app.reducer';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Utente } from './utente.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()

export class UtentiService {

  chaletUID: string;

  constructor(private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private store: Store<fromApp.AppState>) {
  }


    createUtente(utente: Utente) {
      return this.afAuth.createUserWithEmailAndPassword(utente.email, utente.password)
      .then((res) => {
        this.sendEmailVerification();
        delete utente.password
        this.db.collection(`utenti`).doc(res.user.uid).set({
          nome: utente.nome,
          cognome: utente.cognome,
          telefono: utente.telefono,
          email: utente.email,
          chalet_uid: utente.chalet_uid,
          userType: utente.userType,
          data_rinnovo: utente.data_rinnovo,
          data_scadenza: utente.data_scadenza,
        })
      })
      .catch((error) =>
          console.log('error creating user')
      )
    }

    async sendEmailVerification() {
      (await this.afAuth.currentUser).sendEmailVerification()
    }



}

