import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { loginAttribute } from '../services/attribute';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  constructor(
    private popSign: MatDialog,
    private loginservice: LoginService
  ) { }


  //login
  login(data : loginAttribute):void {
    console.log(data, "LOGIN DATA");
    this.loginservice.loginservef(data);
  }

  //redirect to signup component
  popSignUpDialog() {
    this.popSign.open(SignupComponent);
  }

}
