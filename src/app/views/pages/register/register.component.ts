import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { HouseService } from 'src/app/service/house/house.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(private userService: UserService, private houseService: HouseService, private changeDetectorRef: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required],
    email: ['', Validators.email]
  });
  validation = false;
  customStylesValidated = false;
  errorMessage: any;
  sccuessMessage: any;

  get emailValidation() {
    return this.registerForm.get('email');
  }

  register() {
    this.validation = false;
    this.sccuessMessage = '';
    this.errorMessage = '';
    if (this.registerForm.value.cpassword != this.registerForm.value.password) {
      this.errorMessage = 'Password Mismatch';
      return;
    }
    if (this.registerForm.valid) {
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: c => {
          let result: any = c;
          this.registerForm.reset();
          this.sccuessMessage = result.message;
        },
        error: error => {
          this.errorMessage = error.error.message;
        },
        complete: () => {
          console.log('Request complete');
        }
      });
    }
    else {
      this.validation = true;
    }
  }

}
