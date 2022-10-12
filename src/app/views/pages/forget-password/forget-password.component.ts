import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    otp: [''],
    password: [''],
    cpassword: [''],
  });
  sccuessMessage: any;
  errorMessage: any;
  openOTPForm: boolean = false;
  openResetForm: boolean = false;
  resetSuccess: boolean = false;
  disableOTP: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }
  sendOTP() {
    this.clearMessage();
    this.userService.sendOTP(this.registerForm.value).subscribe({
      next: c => {
        this.openOTPForm = true;
        this.disableOTP = true;
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        this.sccuessMessage = "OTP sent successfully";
      }
    });
  }

  submitOTP() {
    this.clearMessage();
    this.userService.submitOTP(this.registerForm.value).subscribe({
      next: c => {
        this.openResetForm = true;
        this.openOTPForm = false;
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        this.sccuessMessage = "OTP validation completed";
      }
    });
  }

  resetPassword() {
    this.clearMessage();
    this.userService.resetPassword(this.registerForm.value).subscribe({
      next: c => {
        this.resetSuccess = true;
        this.openResetForm = false;
      },
      error: error => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        this.sccuessMessage = "Password Reset completed";
      }
    });

  }

  clearMessage() {
    this.errorMessage = null;
    this.sccuessMessage = null;
  }
}
