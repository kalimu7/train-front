import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/Service/booking.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  
  showhide : boolean = false;
  registerForm!: FormGroup;
  tickets: any[] = [];
  constructor(private service : BookingService , private fb: FormBuilder,private toastr : ToastrService,private route : Router) {}

 
  isButtonVisible: boolean = false;

  onLogout(){
    localStorage.removeItem("id");
    this.route.navigate(['/login']);
  }

  ngOnInit(): void {
    if(localStorage.getItem('id')){
      this.isButtonVisible = true;
    }
    this.registerForm = this.fb.group({
      departurCity: ['', Validators.required],
      arrivatCity: ['', [Validators.required]],
      departureday: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log("clicked");
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const search = this.registerForm.value;

      this.service.search(search).subscribe(
        (response: any) => {
          console.log('Found successfully', response);
          this.tickets = response;
          console.log(this.tickets);
          this.showSuccess('trajet founded');
          this.showhide = true;
          // Handle successful registration
        },
        (error: any) => {
          this.showFailure(error.error.message);
          console.error('Not Founded', error);
          // Handle error in registration
        }
      );
    }else{
      this.showFailure("info arent valid");
      console.log(" info arent valid ");
    }
  }


  bookticket(idticket : any){
    if(!localStorage.getItem('id')){
      this.showFailure("cant book a ticket need to register");
      return;
    }
    const storedId = localStorage.getItem('id');

    // Check if the user is not registered (i.e., 'id' is not in localStorage)
    if (!storedId) {
      this.showFailure("Can't book a ticket. Need to register.");
      return;
    }
  
    // Convert the stored ID to an integer
    const passengerId = parseInt(storedId, 10);
    const ticket = {
      'passenger_id': passengerId,
      'trajet_id': idticket,
      'numberOfPassengers':1
    };
      this.service.book(ticket).subscribe(

        (response: any) => {

            this.showSuccess("booked successfully");
            console.log(response);
        },
        (error: any) => {
          this.showFailure(error.message);
          console.log(error);
        }
      )
  }     

  showSuccess(msg : any) {
    this.toastr.success(msg, 'Toastr fun!',{ timeOut: 5000 });
  }


  
  showFailure(message : any){
    this.toastr.error(message,'error');
  }

 


}
