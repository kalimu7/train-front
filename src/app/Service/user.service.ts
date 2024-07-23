import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: String = "http://localhost:8000/";

  constructor(private http:HttpClient) { }
  register(user : any){
    return this.http.post(`${this.url}paasenger/register`,user);
  }

  login(user : any){

    return this.http.post(`${this.url}paasenger/login`,user);
  }
}
