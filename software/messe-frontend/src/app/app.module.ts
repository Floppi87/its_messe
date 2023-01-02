import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularComponent } from './components/formular/formular.component';
import { MainComponent } from './components/base/main/main.component';
import { RequiredStarComponent } from './components/formular/required-star/required-star.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './components/formular/webcam/webcam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    FormularComponent,
    MainComponent,
    RequiredStarComponent,
    WebcamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
