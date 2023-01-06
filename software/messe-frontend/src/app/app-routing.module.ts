import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/admin/customer-list/customer-list.component';
import { FinishedComponent } from './components/base/formular/finished/finished.component';
import { FormularComponent } from './components/base/formular/formular.component';
import { MainComponent } from './components/base/main/main.component';

const routes: Routes = [
  {
    path: 'admin', component: CustomerListComponent
  },
  {
    path: 'register', component: FormularComponent
  },
  {
    path: 'success', component: FinishedComponent
  },
  {
    path: "**", component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
