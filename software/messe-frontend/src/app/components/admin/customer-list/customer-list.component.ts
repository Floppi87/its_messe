import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { PersonData } from 'src/app/types/data';

@Component({
  selector: 'its-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerList: PersonData[] = [];
  sending: boolean;
  syncing: boolean;
  constructor(private rest: RestService, private router: Router) {
    this.sending = false;
    this.syncing = false;
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
    this.sending = true;
    this.rest.getCustomers().pipe(catchError(err => {
      this.sending= false;
      window.alert(err.Message ? err.Message : "Ubekannter Fehler beim Laden der Kunden")
      return throwError(() => new Error(err));
    })).subscribe(resp => {
      console.log(resp)
      this.sending = false
      this.customerList = <PersonData[]>resp;
    })
  }

  
  syncDB() {
    this.syncing = true;
    this.rest.syncDatabase().pipe(catchError(err => {
      this.syncing= false;
      window.alert(err.Message ? err.Message : "Unbekannter Fehler beim synchronisieren")
      return throwError(() => new Error(err));
    })).subscribe(resp => {
      this.syncing = false;
      console.log(resp)
    });
  }
}
