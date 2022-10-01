import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { HouseService } from 'src/app/service/house/house.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.scss']
})
export class CreateTenantComponent implements OnInit {

  tenantForm = this.formBuilder.group({
    name: [],
    status: ['New'],
    phone: [],
    houseOwnerId: []
  });
  currentUser: any;
  moment: any = moment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  sccuessMessage: any;
  errorMessage: any;
  tenants: any;

  constructor(private houseService: HouseService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.userService.retrieve());
    this.httpOptions = { headers: new HttpHeaders({ 'Authorization': this.currentUser.tokenType + ' ' + this.currentUser.accessToken }) };
    this.getTenant();
  }

  saveTenant() {
    this.tenantForm.value.houseOwnerId = this.currentUser.id;
    this.houseService.create_tenant(this.tenantForm.value, this.httpOptions).subscribe({
      next: c => {
        let result: any = c;
        this.sccuessMessage = result;
        this.getTenant();
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  getTenant() {
    this.houseService.get_tenant(this.currentUser.id, this.httpOptions).subscribe({
      next: c => {
        let result: any = c;
        this.tenants = result;
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

}
