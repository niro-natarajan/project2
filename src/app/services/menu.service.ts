import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { products } from './attribute';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
    ) {}

    getAllMenu(){
      return this.http.get<products[]>(`http://localhost:8080/getAllMenu`);
    }




}
