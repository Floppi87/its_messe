import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonData } from '../types/data';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  registerCustomer(data: PersonData) {
    this.http.post("http://localhost:5085/api/v1/data", data, {observe: "response"}).subscribe(resp => {
      console.log(resp)
    })
  }

  getProducts() {
    return this.http.get("http://localhost:5085/api/v1/products")
  }
}
