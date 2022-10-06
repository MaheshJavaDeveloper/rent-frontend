import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { HouseService } from 'src/app/service/house/house.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.scss']
})
export class CreateHouseComponent implements OnInit {

  houseForm = this.formBuilder.group({
    name: [],
    meterNumber: [],
    overallMeterReading: [],
    status: ['New'],
    advanceAmount: [],
    rentFixed: [],
    houseOwnerId: [],
    pricePerUnit: []
  });
  currentUser:any;
  moment: any = moment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  sccuessMessage:any;
  errorMessage:any;

  constructor(private router: Router,private houseService: HouseService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser =JSON.parse(this.userService.retrieve());
    this.httpOptions = { headers: new HttpHeaders({ 'Authorization': this.currentUser.tokenType + ' ' + this.currentUser.accessToken }) }
  }

  saveHouse(){
    this.sccuessMessage='';
    this.houseForm.value.houseOwnerId=this.currentUser.id;
    this.houseService.create_house(this.houseForm.value,this.httpOptions).subscribe({
      next: c => {
        let result: any = c;        
        this.sccuessMessage = "Hosue created successfully";
        this.houseForm.reset();
        this.router.navigate(['/rent']);
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        console.log('Request complete');
      } 
    })
  }

}
