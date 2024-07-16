import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCounter } from '../store/cart/cart.selector';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  counter$: Observable<number> | undefined;
  username$: Observable<string | null> | undefined; // Observable for the username

  constructor(private store: Store,
    private poplogin: MatDialog,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.counter$ = this.store.pipe(select(selectCartCounter));
     this.username$ = this.loginService.username$; 
  }


  // Method to handle logout
  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

  // popLoginDialog(){
  //   this.poplogin.open(LoginComponent)
  // }

}
