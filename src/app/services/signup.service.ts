import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUpAttribute } from './attribute';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  isLoggedIn= new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router:Router
  ) { }

  userSignUp(data: signUpAttribute){
    this.http.post(`http://localhost:8080/saveSignUpData`, 
    data,
    {observe:"response"}).subscribe((res)=>{
      this.isLoggedIn.next(true);
      localStorage.setItem("signup",JSON.stringify(res.body))
      this.router.navigate(["home"])
      console.warn(res, " - Response Data");
    })
    // return false;

  }

}
