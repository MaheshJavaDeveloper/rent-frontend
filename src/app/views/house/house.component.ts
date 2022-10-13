import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HouseService } from '../../service/house/house.service';
import * as moment from 'moment-timezone';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { getStyle } from '@coreui/utils/src';

interface Rent {
  houseNumber?: string;
  billDate?: string;
  rentAmount?: Number;
  currentMeterReading?: Number;
  previousMeterReading?: Number;
  consumedMeterReading?: Number;
  electricCharges?: Number;
  waterCharge?: Number;
  pendingPayment?: Number;
  otherCharges?: Number;
  totalRent?: Number;
  rentStatus?: string;
  houseOwnerId?: Object;
}

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.scss']
})
export class HouseComponent implements OnInit, AfterContentInit {

  houseData: any;
  rentData = {} as Rent;
  selectedHouse: any;
  successAlertData: any;
  contactForm: any;
  rentDataList: any;
  moment: any = moment;
  currentUser: any;
  tenants: any;
  availableTenants: any;
  houseCount: any;
  //Charts
  chartData: any[] = [];
  options: any[] = [];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  setData(hosues: any) {
    let i = 0;
    hosues.forEach((hosue: any) => {
      let chartDataSet = hosue.rents.map((s: any) => Number(s.totalRent));
      let labelSet = hosue.rents.map((s: any) => moment(s.billDate).format("MMM YY"));
      let dataset = [{
        label: 'TotalRent',
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,.55)',
        pointBackgroundColor: getStyle('--cui-primary'),
        pointHoverBorderColor: getStyle('--cui-primary'),
        data: chartDataSet
      }];
      this.chartData[hosue.id] = {
        labels: labelSet,
        datasets: dataset
      };
      i++;
    });
  }

  updateTenantForm = this.formBuilder.group({
    tenant: []
  });

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private houseService: HouseService, private changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder, private userService: UserService) { }

  date: any = new Date().toLocaleDateString;

  ngOnInit(): void {
    this.resetForm();
    let token = this.userService.retrieve();
    this.currentUser = JSON.parse(token);
    this.httpOptions = { headers: new HttpHeaders({ 'Authorization': this.currentUser.tokenType + ' ' + this.currentUser.accessToken }) }
    this.houseService.get_house(this.currentUser.id, this.httpOptions).subscribe(async data => {
      this.houseData = data;
      this.setData(this.houseData);
    });
    this.getTenant();
  }

  public visible = false;
  public rentVisible = false;
  public visibleAlert = false;
  public tenantVisible = false;

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  rentalModalChange(event: any) {
    this.rentVisible = event;
  }

  tenantModalChange(event: any) {
    this.tenantVisible = event;
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  toggleRentModal() {
    this.rentVisible = !this.rentVisible;
  }

  toggleTenantModal() {
    this.tenantVisible = !this.tenantVisible;
  }

  createRent(data: any) {
    this.selectedHouse = data;
    this.rentData = {};
    this.contactForm.controls['pricePerUnit'].setValue(this.selectedHouse.pricePerUnit);
    this.visible = true;
  }

  computeRent() {

    let currentMeterReading = Number(this.contactForm.value.currentMeter);
    let previousMeterReading = this.selectedHouse.overallMeterReading;
    let consumedMeterReading = currentMeterReading != 0 ? currentMeterReading - previousMeterReading : 0;
    let electricCharges = consumedMeterReading * this.selectedHouse.pricePerUnit;
    let total = electricCharges + Number(this.contactForm.value.waterCharge) + Number(this.contactForm.value.otherCharge) + this.selectedHouse.rentFixed

    this.rentData.houseNumber = this.selectedHouse.id;
    this.rentData.billDate = this.contactForm.value.billDate!;
    this.rentData.rentAmount = this.selectedHouse.rentFixed;
    this.rentData.currentMeterReading = currentMeterReading;
    this.rentData.previousMeterReading = previousMeterReading;
    this.rentData.consumedMeterReading = consumedMeterReading;
    this.rentData.electricCharges = electricCharges;
    this.rentData.waterCharge = Number(this.contactForm.value.waterCharge);
    this.rentData.pendingPayment = Number(this.contactForm.value.dues);
    this.rentData.otherCharges = Number(this.contactForm.value.otherCharge);
    this.rentData.totalRent = total;
    this.rentData.houseOwnerId = this.currentUser.id;
  }

  saveRent() {
    this.houseService.saveRent(this.rentData, this.httpOptions).subscribe(data => {
      let savedData: any = data;
      this.visible = !this.visible;
      this.successAlertData = 'Rent amount ' + savedData.totalRent + ' for Tenant ' + this.selectedHouse.currentTenant.name + '  saved successfully';
      this.visibleAlert = true;
      this.resetForm();
    });
  }

  resetForm() {
    this.contactForm = this.formBuilder.group({
      billDate: [moment(new Date()).format(
        'YYYY-MM-DD'
      )],
      currentMeter: [0],
      waterCharge: [0],
      otherCharge: [0],
      pricePerUnit: [0],
      dues: [0],
      more: [false]
    });
  }

  openRent(id: Number) {
    this.houseService.get_rent(id, this.httpOptions).subscribe(data => {
      this.rentDataList = data;
      this.rentVisible = true;
    });
  }

  updatePaid(rentData: any) {
    if (rentData.rentStatus == "PAID") {
      rentData.rentStatus = "UNPAID"
    } else {
      rentData.rentStatus = "PAID"
    }
    this.houseService.update_rent(rentData, this.httpOptions).subscribe(data => {
      this.successAlertData = 'Payment Updated';
    })
  }

  getTenant() {
    this.houseService.get_tenant(this.currentUser.id, this.httpOptions).subscribe({
      next: c => {
        this.tenants = c;
        this.availableTenants = this.tenants.filter((obj: any) => {
          return (obj.status === 'In-Active' || obj.status === 'New');
        });
      }
    });
  }

  getRecipt(rent: any) {
    this.houseService.get_reciept(rent.id, this.httpOptions).subscribe((data:any) => {
      let blob = new Blob([data], {type: 'application/pdf'});    
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "Receipt_"+rent.invoiceNumber+".pdf";
      link.click();
    
    });
  }

  sendRecipt(rent: any) {
    this.houseService.send_reciept(rent.id, this.httpOptions).subscribe();
  }

  sendMailRecipt(rent: any) {
    this.houseService.send_reciept_mail(rent.id, this.httpOptions).subscribe();
  }

  updateTenant() {
    this.selectedHouse.tenant = this.tenants.find((obj: any) => {
      return Number(obj.id) === Number(this.updateTenantForm.value.tenant);
    });
    this.selectedHouse.tenant.status = 'Active';
    this.selectedHouse.status = 'Occupied';
    this.houseService.update_house(this.selectedHouse, this.httpOptions).subscribe({
      next: c => {
        this.successAlertData = this.selectedHouse.name + ' linked with ' + this.selectedHouse.tenant.name + ' successfully';
        this.tenantVisible = false;
        this.visibleAlert = true;
      }
    });
    this.houseService.update_tenant(this.selectedHouse.tenant, this.httpOptions).subscribe({
      next: c => {
        this.availableTenants = this.availableTenants.filter((obj: any) => obj.id !== this.selectedHouse.tenant.id);
      }
    });
  }

  removeTenant(data: any) {
    data.tenant.status = 'In-Active';
    this.availableTenants.push(data.tenant);
    this.houseService.update_tenant(data.tenant, this.httpOptions).subscribe({
      next: c => {
        this.successAlertData = 'Tenant Updated';
      }
    });
    data.status = 'Vaccant';
    data.tenant = null;
    this.houseService.update_house(data, this.httpOptions).subscribe({
      next: c => {
        this.successAlertData = 'Tenant unlinked from ' + data.name + ' successfully';
        this.tenantVisible = false;
        this.visibleAlert = true;
      }
    });
  }

  openUpdateTenant(data: any) {
    this.selectedHouse = data;
    this.tenantVisible = true;
  }

}


