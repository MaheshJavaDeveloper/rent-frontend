import { AfterContentInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HouseService } from '../../service/house.service';
import * as moment from 'moment-timezone';
import { HttpHeaders } from '@angular/common/http';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private houseService: HouseService, private changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  date: any = new Date().toLocaleDateString;

  ngOnInit(): void {
    this.resetForm();
    this.houseService.get_token().subscribe(data => {
      let token: any = data;
      this.httpOptions = { headers: new HttpHeaders({ 'Authorization': token.tokenType + ' ' + token.accessToken }) }
      this.houseService.get_house(this.httpOptions).subscribe(data => {
        this.houseData = data;
      })
    });
  }

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  public visible = false;
  public rentVisible = false;
  public visibleAlert = false;

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  rentalModalChange(event: any) {
    this.rentVisible = event;
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  toggleRentModal() {
    this.rentVisible = !this.rentVisible;
  }

  createRent(data: any) {
    this.selectedHouse = data;
    this.rentData = {};
    this.visible = true;
  }

  computeRent() {

    let currentMeterReading = Number(this.contactForm.value.currentMeter);
    let previousMeterReading = this.selectedHouse.overallMeterReading;
    let consumedMeterReading = currentMeterReading != 0 ? currentMeterReading - previousMeterReading : 0;
    let electricCharges = consumedMeterReading * 15;
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
      pricePerUnit: [15],
      dues: [0]
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
      console.log("Updated");
    })
  }

}

