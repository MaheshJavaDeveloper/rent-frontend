import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  baseUrl: string = "https://rent-backend-api.herokuapp.com";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }


  //House
  create_house(data: any, httpOptions: any) {
    return this.httpClient.post(`https://rent-backend-api.herokuapp.com/api/v1/house`, data, httpOptions);
  }
  get_house(httpOptions: any) {
    return this.httpClient.get(`https://rent-backend-api.herokuapp.com/api/v1/house`, httpOptions);
  }  
  update_house(data: any, httpOptions: any) {
    return this.httpClient.patch(`https://rent-backend-api.herokuapp.com/api/v1/house`, data, httpOptions);
  }

  //Rent
  get_rent(id: Number, httpOptions: any) {
    return this.httpClient.get(`https://rent-backend-api.herokuapp.com/api/v1/rent/house/` + id, httpOptions);
  }
  saveRent(data: any, httpOptions: any) {
    return this.httpClient.post(`https://rent-backend-api.herokuapp.com/api/v1/rent`, data, httpOptions);
  }
  update_rent(data: any, httpOptions: any) {
    return this.httpClient.patch(`https://rent-backend-api.herokuapp.com/api/v1/rent`, data, httpOptions);
  }

  //Tenant
  create_tenant(data: any, httpOptions: any) {
    return this.httpClient.post(`https://rent-backend-api.herokuapp.com/api/v1/tenant`, data, httpOptions);
  }
  get_tenant(id: Number, httpOptions: any) {
    return this.httpClient.get(`https://rent-backend-api.herokuapp.com/api/v1/tenant/owner/` + id, httpOptions);
  }
  update_tenant(data: any, httpOptions: any) {
    return this.httpClient.patch(`https://rent-backend-api.herokuapp.com/api/v1/tenant`, data, httpOptions);
  }
}
