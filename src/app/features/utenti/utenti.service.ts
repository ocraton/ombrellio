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
      console.log(utente)
      // this.afAuth.createUserWithEmailAndPassword(utente.email, utente.password)
      return this.db.collection(`utenti`).add(utente)
    }



}

