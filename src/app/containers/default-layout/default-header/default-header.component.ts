import { JsonPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
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
  user :any;
  houseCount = 42;

  constructor(private classToggler: ClassToggleService,private userService:UserService) {
    super();
  }
  ngOnInit(): void {
    this.user = JSON.parse(this.userService.retrieve());
  }

  logout(){
    this.userService.logout();
  }
}
