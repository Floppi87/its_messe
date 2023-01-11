import { HttpClient } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { PersonData } from '../types/data';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  serverUrl = isDevMode() ? "http://localhost:5085" : "http://localhost:5000"
  /**
   * Injectable Service to provide and handle http request to server
   */
  constructor(private http: HttpClient) { }

  registerCustomer(data: any) {
    return this.http.post(this.serverUrl + "/api/v1/data", data, {observe: "response"})
  }

  getProducts() {
    return this.http.get(this.serverUrl + "/api/v1/products")
  }

  getCustomers() {
    return this.http.get(this.serverUrl + "/api/v1/customers")
  }

  syncDatabase() {
    return this.http.get(this.serverUrl + "/api/v1/sync")
  }
}
