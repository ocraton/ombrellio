import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { UserdashboardLayoutComponent } from './components/userdashboard-layout/userdashboard-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { MaterialDesignModule } from '../shared/material-design.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';

@NgModule({
  declarations: [
    NavComponent,
    UserdashboardLayoutComponent,
    LoginLayoutComponent
  ],
  exports: [
    NavComponent,
    BrowserAnimationsModule,
    LayoutModule
  ],
  imports: [
    CommonModule,
    MaterialDesignModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase, 'ombrellio'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: []
})
export class CoreModule { }
