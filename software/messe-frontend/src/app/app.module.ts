import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularComponent } from './components/formular/formular.component';
import { MainComponent } from './components/base/main/main.component';
import { RequiredStarComponent } from './components/formular/required-star/required-star.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularComponent,
    MainComponent,
    RequiredStarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
