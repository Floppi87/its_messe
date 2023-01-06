import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './components/admin/customer-list/customer-list.component';
import { FormularComponent } from './components/base/formular/formular.component';

const routes: Routes = [
  {
    path: 'admin', component: CustomerListComponent
  },
  {
    path: "**", component: FormularComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
