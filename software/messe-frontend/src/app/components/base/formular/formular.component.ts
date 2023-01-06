import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Product } from 'src/app/types/data';

@Component({
  selector: 'its-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  validated: boolean;
  constructor(private rest: RestService, private router: Router) {
    this.validated = false;
  }
  data = {
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    adress: {
      plz: "",
      city: "",
      street: "",
      houseNr: ""
    },
    picture: "",
    company: {
      id: -1,
      name: ""
    },
    interests: <Product[]>[]
  }

  ngOnInit(): void {
  }

  onSnapshot(img: string) {
    this.data.picture = img;
  }

  onInterest(products: Product[]) {
    this.data.interests = products;
  }

  validate() {
    this.validated = true;
    let valid: boolean = !!this.data.firstname && !!this.data.surname && !!this.data.email && !!this.data.picture && !!this.data.adress.city && !!this.data.adress.houseNr && !!this.data.adress.plz && !!this.data.adress.street && (this.data.interests.length > 0);
    console.log(valid)
    console.log(this.data)
    if(valid) {
      this.sendData();
    }
    return valid;
  }
  
  sendData() {
    this.rest.registerCustomer(this.data).subscribe(resp => {
      console.log(resp);
      this.router.navigate(["/success"]);
    });
  }

}
