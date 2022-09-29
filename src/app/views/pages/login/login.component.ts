import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  sccuessMessage: any;
  errorMessage: any; 

  constructor(private formBuilder: FormBuilder,private userService: UserService,private router: Router) { }

  login() {
    console.log(this.registerForm.value);

    this.userService.login(this.registerForm.value).subscribe({
      next: c => {
        let result: any = c; 
        console.log(result);
        this.userService.store(result);     
        this.router.navigate(['/rent']);
      },
      error: error => {
        this.errorMessage = error.error.error;
      },
      complete: () => {
        console.log('Request complete');
      }
    });
  }
}
