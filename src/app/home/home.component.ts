import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private frontPoplogin: MatDialog
    ) { }


  frontPopLoginDialog() {
    this.frontPoplogin.open(LoginComponent)
  }
}
