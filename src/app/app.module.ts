import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ClientiModule } from './features/clienti/clienti.module';
import { MansioniModule } from './features/mansioni/mansioni.module';
import { AttrezzatureModule } from './features/attrezzature/attrezzature.module';
import { RisorseumaneModule } from './features/risorseumane/risorseumane.module';
import { AziendeModule } from './features/aziende/aziende.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { NotFoundModule } from './features/not-found/not-found.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './features/login/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './core/services/auth.service';
import { reducers } from './store/app.reducers';
import { RequisitiModule } from './features/requisiti/requisiti.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';


@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    DashboardModule,
    ClientiModule,
    RisorseumaneModule,
    AziendeModule,
    MansioniModule,
    AttrezzatureModule,
    RequisitiModule,
    HomeModule,
    LoginModule,
    AppRoutingModule,
    NotFoundModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'docfire-app',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
