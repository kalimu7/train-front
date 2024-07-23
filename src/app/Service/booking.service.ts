import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private url: String = "http://localhost:8000/";

  constructor(private http:HttpClient) { }

  search (search:any){
    return this.http.post(`${this.url}trajet/search`,search);
  }

  book(ticket : any){
    console.log(ticket);
    return this.http.post(`${this.url}ticket/book`,ticket);
    
  }
  
}
