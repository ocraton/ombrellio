import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';


import * as fromApp from '../../../store/app.reducer';
import * as authState from './../store/auth.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


    authState: Observable<authState.default>;
    model: any = {};
    loginerror = false;


    constructor(private store: Store<fromApp.AppState>,
                private afAuth: AngularFireAuth,
                private router: Router) {
    }

    ngOnInit(): void {
      this.authState = this.store.select('auth');
    }

    onSendResetLink(): void {
      const email = this.model.email;
      this.afAuth.sendPasswordResetEmail(email);
      this.router.navigate(['/login/resetconfirm']);
    }

}
