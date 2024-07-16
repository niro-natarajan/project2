import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { signUpAttribute } from '../services/attribute';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(
    private poplog: MatDialog,
    // private router: Router,
    private signupservice:SignupService
  ) { }

  //redirect to login component
  poplogDialog() {
    this.poplog.open(LoginComponent);
  }

  //signup
  signUpSubmit(data : signUpAttribute): void {
    this.signupservice.userSignUp(data)
  }

}
