import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homelogin',
  templateUrl: './homelogin.component.html',
  styleUrl: './homelogin.component.scss'
})
export class HomeloginComponent {

  constructor( private router: Router) {}

  toMenu() {
    this.router.navigate(['/menu']);
  }

}
