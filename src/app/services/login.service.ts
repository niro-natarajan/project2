import { Injectable } from '@angular/core';
import { loginAttribute } from './attribute';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignupService } from './signup.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //welcome
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();
  // loggedIn:boolean=false;   //----------auth

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginservice: SignupService,
  ) { }

  loginservef(data: loginAttribute) {
    console.warn(data);
    this.http.get(`http://localhost:8080/authenticateSignup?username=${data.username}&password=${data.password}`,
      { observe: "response" }).subscribe((res: any) => {

        if (res && res.body && res.body.length) {
          
          this.loginservice.isLoggedIn.next(true);
          localStorage.setItem("login", JSON.stringify(res.body))

          // welcome
          this.usernameSubject.next(data.username);    // Emit the logged-in user's username
          this.router.navigate(["homelogin"])
          console.warn(res);
        }
        else {
          console.warn("Inncorrect password");
          // this.loggedIn=false;     //----------auth
          // this.isLoginError.emit(true);
        }
      })

  }


  // Method to handle logout
  logout() {
    // Clear the stored user session data
    localStorage.removeItem('login');
    
    // Update the login status
    this.loginservice.isLoggedIn.next(false);
    
    // Emit a null value for the username
    this.usernameSubject.next(null);


  }
























// this.loggedIn=true;   //-------if---auth
          // Assuming res.body contains user info and includes a username property




  //-----auth
  // isAuth(){
  //   return this.loggedIn;
  //  }


}

