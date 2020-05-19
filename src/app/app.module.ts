import { OrdiniModule } from './features/ordini/ordini.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ChaletsModule } from './features/chalets/chalets.module';
import { NotFoundModule } from './features/not-found/not-found.module';
import { HomeModule } from './features/home/home.module';
import { LoginModule } from './features/login/login.module';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './features/login/store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './core/services/auth.service';
import { reducers } from './store/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { OmbrelloniModule } from './features/ombrelloni/ombrelloni.module';
import { SubscriptionService } from './core/services/subscription.service';


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
    OrdiniModule,
    ChaletsModule,
    OmbrelloniModule,
    HomeModule,
    LoginModule,
    AppRoutingModule,
    NotFoundModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'ombrelio-app',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [AuthService, SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
