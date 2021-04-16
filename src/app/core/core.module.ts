import { CoreRoutingModule } from './core-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdashboardLayoutComponent } from './components/userdashboard-layout/userdashboard-layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { MaterialDesignModule } from '../shared/material-design.module';
import { NavComponent } from './components/nav/nav.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {
  AngularFireAnalyticsModule,
  ScreenTrackingService,
  UserTrackingService,
  CONFIG,
  DEBUG_MODE
} from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    UserdashboardLayoutComponent,
    LoginLayoutComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    MaterialDesignModule,
    AngularFireModule.initializeApp(environment.firebase, 'ombrellio'), // imports firebase/app needed for everything
    AngularFireAnalyticsModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  providers: [
    UserTrackingService,
    ScreenTrackingService
  ]
})
export class CoreModule { }

