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
    id: [],
    name: [],
    status: [''],
    phone: [],
    email: [],
    houseOwnerId: []
  });
  currentUser: any;
  moment: any = moment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  sccuessMessage: any;
  sccuessUpdateMessage: any;
  errorMessage: any;
  tenants: any;

  public visible = false;


  toggleTenant() {
    this.visible = !this.visible;
    if(!this.visible){
      this.tenantForm.reset();
    }
  }
  handleEditTenantChange(event: any) {
    this.visible = event;
  }

  constructor(private houseService: HouseService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.userService.retrieve());
    this.httpOptions = { headers: new HttpHeaders({ 'Authorization': this.currentUser.tokenType + ' ' + this.currentUser.accessToken }) };
    this.getTenant();
  }

  updateTenant(data: any) {
    this.tenantForm.controls['id'].setValue(data.id);
    this.tenantForm.controls['name'].setValue(data.name);
    this.tenantForm.controls['phone'].setValue(data.phone);
    this.tenantForm.controls['status'].setValue(data.status);
    this.tenantForm.controls['email'].setValue(data.email);
    this.tenantForm.controls['houseOwnerId'].setValue(data.houseOwnerId);
    this.visible = true;
  }
  saveTenant() {
    this.tenantForm.value.houseOwnerId = this.currentUser.id;
    this.tenantForm.value.status = 'New';
    this.houseService.create_tenant(this.tenantForm.value, this.httpOptions).subscribe({
      next: c => {
        let result: any = c;
        this.sccuessMessage = 'New Tenant '+result.name+' Created successfully';
        this.getTenant();
        this.tenantForm.reset();
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }

  updateTenantSubmit() {
    this.houseService.update_tenant(this.tenantForm.value, this.httpOptions).subscribe({
      next: c => {
        let result: any = c;
        this.sccuessUpdateMessage = 'Tenant '+result.name+' updated successfully';
        this.getTenant();
        this.tenantForm.reset();
        this.toggleTenant();
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
