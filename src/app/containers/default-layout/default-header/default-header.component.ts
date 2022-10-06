import { JsonPipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { HouseService } from 'src/app/service/house/house.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  user: any;
  houseCount :any;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private classToggler: ClassToggleService, private userService: UserService,private houseService: HouseService) {
    super();
  }
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.retrieve());
    this.httpOptions = { headers: new HttpHeaders({ 'Authorization': this.user.tokenType + ' ' + this.user.accessToken }) }
  
    this.houseService.get_house_counts(this.user.id, this.httpOptions).subscribe((data:any) => {
      this.houseCount = data;
    });
  }

  logout() {
    this.userService.logout();
  }
}
