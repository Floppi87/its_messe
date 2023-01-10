import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { PersonData } from 'src/app/types/data';

@Component({
  selector: 'its-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: PersonData[] = [];
  constructor(private rest: RestService, private router: Router) {

    this.getCustomers()
  }

  ngOnInit(): void {
    this.requestPassword();
  }

  requestPassword() {
    let input = window.prompt("Passwort:", "");
    if(!input) {
      this.router.navigate(["**"])
    } else {
      if(input !== "admin") {
        window.alert("Falsche Passwort");
        this.requestPassword();
      }
    }
  }

  getCustomers() {
    this.rest.getCustomers().subscribe(resp => {
      console.log(resp)
      this.customerList = <PersonData[]>resp;
    })
  }

  syncDB() {
    this.rest.syncDatabase();
  }
}
