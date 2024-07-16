import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrl: './log.component.scss'
})
export class LogComponent {

  constructor(
    private router: Router
  ){}

  menu(){
    this.router.navigate(['/menu']);
  }


}
