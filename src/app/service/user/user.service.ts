import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  baseUrl = environment.baseUrl;

  private tokenKey: string = 'app_token';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient, private router: Router) { }

  registerUser(data: any) {
    return this.httpClient.post(this.baseUrl + `auth/signup`, data, this.httpOptions);
  }

  login(data: any) {
    return this.httpClient.post(this.baseUrl + `auth/signin`, data, this.httpOptions);
  }

  sendOTP(data: any) {
    return this.httpClient.post(this.baseUrl + `reset/sendOTP`, data, this.httpOptions);
  }

  submitOTP(data: any) {
    return this.httpClient.post(this.baseUrl + `reset/submitOTP`, data, this.httpOptions);
  }

  resetPassword(data: any) {
    return this.httpClient.post(this.baseUrl + `reset/resetPassword`, data, this.httpOptions);
  }

  store(content: Object) {
    localStorage.setItem(this.tokenKey, JSON.stringify(content));
  }

  retrieve() {
    let storedToken: any = localStorage.getItem(this.tokenKey);
    if (!storedToken) throw 'no token found';
    return storedToken;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
