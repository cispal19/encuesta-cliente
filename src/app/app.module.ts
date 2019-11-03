import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './pages/main/main.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorComponent } from './pages/login/error/error.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AboutComponent } from './pages/about/about.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { NuevaEncuestaComponent } from './pages/encuesta/nueva-encuesta/nueva-encuesta.component';
import { RegistroComponent } from './pages/encuesta/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ErrorComponent,
    LogoutComponent,
    AboutComponent,
    EncuestaComponent,
    NuevaEncuestaComponent,
    RegistroComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent,
    NuevaEncuestaComponent
  ]
})
export class AppModule { }
