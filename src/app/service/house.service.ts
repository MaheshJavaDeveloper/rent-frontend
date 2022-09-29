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

  get_token() {
    return this.httpClient.post(`https://rent-backend-api.herokuapp.com/api/auth/signin`, `{"username":"Mahsesh","password": "Iniyan@2020"}`, this.httpOptions);
  }
  get_house(httpOptions: any) {
    return this.httpClient.get(`https://rent-backend-api.herokuapp.com/api/v1/house`, httpOptions);
  }
  get_rent(id:Number,httpOptions: any) {
    return this.httpClient.get(`https://rent-backend-api.herokuapp.com/api/v1/rent/house/`+id, httpOptions);
  }
  saveRent(data: any, httpOptions: any) {
    return this.httpClient.post(`https://rent-backend-api.herokuapp.com/api/v1/rent`, data, httpOptions);
  }
  update_rent(data: any, httpOptions: any) {
    return this.httpClient.patch(`https://rent-backend-api.herokuapp.com/api/v1/rent`,data, httpOptions);
  }
}
