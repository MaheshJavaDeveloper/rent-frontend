import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  baseUrl = environment.baseUrl+'v1/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }


  //House
  create_house(data: any, httpOptions: any) {
    return this.httpClient.post(this.baseUrl + `house`, data, httpOptions);
  }
  get_house(id: any, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `house/owner/` + id, httpOptions);
  }
  get_house_counts(id: any, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `house/count/owner/` + id, httpOptions);
  }
  update_house(data: any, httpOptions: any) {
    return this.httpClient.patch(this.baseUrl + `house`, data, httpOptions);
  }

  //Rent
  get_rent(id: Number, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `rent/house/` + id, httpOptions);
  }
  saveRent(data: any, httpOptions: any) {
    return this.httpClient.post(this.baseUrl + `rent`, data, httpOptions);
  }
  update_rent(data: any, httpOptions: any) {
    return this.httpClient.patch(this.baseUrl + `rent`, data, httpOptions);
  }
  get_reciept(id: Number, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `rent/downloadReceipt/` + id, {
      responseType: 'blob' as 'json', headers: httpOptions.headers
    });
  }
  send_reciept(id: Number, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `rent/sendReceipt/` + id, httpOptions);
  }
  send_reciept_mail(id: Number, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `rent/sendMailReceipt/` + id, httpOptions);
  }

  //Tenant
  create_tenant(data: any, httpOptions: any) {
    return this.httpClient.post(this.baseUrl + `tenant`, data, httpOptions);
  }
  get_tenant(id: Number, httpOptions: any) {
    return this.httpClient.get(this.baseUrl + `tenant/owner/` + id, httpOptions);
  }
  update_tenant(data: any, httpOptions: any) {
    return this.httpClient.patch(this.baseUrl + `tenant`, data, httpOptions);
  }
}
