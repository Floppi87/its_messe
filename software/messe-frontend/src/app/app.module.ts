import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularComponent } from './components/base/formular/formular.component';
import { MainComponent } from './components/base/main/main.component';
import { RequiredStarComponent } from './components/formular/required-star/required-star.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './components/formular/webcam/webcam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { PersonalFormComponent } from './components/formular/personal-form/personal-form.component';
import { PersonalAdressFormComponent } from './components/formular/personal-adress-form/personal-adress-form.component';
import { WebcamFormComponent } from './components/formular/webcam-form/webcam-form.component';
import { CompanyFormComponent } from './components/formular/company-form/company-form.component';
import { InterestFormComponent } from './components/formular/interest-form/interest-form.component';
import { FormControlComponent } from './components/formular/form-control/form-control.component';
import { FinishedFormComponent } from './components/formular/finished-form/finished-form.component'

@NgModule({
  declarations: [
    AppComponent,
    FormularComponent,
    MainComponent,
    RequiredStarComponent,
    WebcamComponent,
    PersonalFormComponent,
    PersonalAdressFormComponent,
    WebcamFormComponent,
    CompanyFormComponent,
    InterestFormComponent,
    FormControlComponent,
    FinishedFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
