import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularComponent } from './components/base/formular/formular.component';
import { MainComponent } from './components/base/main/main.component';
import { RequiredStarComponent } from './components/base/formular/required-star/required-star.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './components/base/formular/webcam/webcam.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { WebcamFormComponent } from './components/base/formular/webcam-form/webcam-form.component';
import { InterestFormComponent } from './components/base/formular/interest-form/interest-form.component';
import { FinishedComponent } from './components/base/formular/finished/finished.component';
import { CustomerListComponent } from './components/admin/customer-list/customer-list.component';
import { LoadingComponent } from './components/base/formular/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularComponent,
    MainComponent,
    RequiredStarComponent,
    WebcamComponent,
    WebcamFormComponent,
    InterestFormComponent,
    FinishedComponent,
    CustomerListComponent,
    LoadingComponent
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
