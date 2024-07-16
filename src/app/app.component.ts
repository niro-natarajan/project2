import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ECom';
  constructor(private router: Router) {}
 
  isLoginRoute(): boolean {
    return this.router.url === '/';
  }
}
