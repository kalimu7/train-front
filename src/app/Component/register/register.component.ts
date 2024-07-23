import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder,private toastr : ToastrService,private route : Router) {  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({

      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cin: ['', Validators.required]

    });
  }

  onSubmit() {
    console.log("clicked");
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      this.userService.register(user).subscribe(
        (response: any) => {
          console.log('User registered successfully', response);
          this.showSuccess("user created in successfully");
          this.route.navigate(['/login']);
          // Handle successful registration
        },
        (error: any) => {
          console.error('Error registering user', error);
          this.showFailure("something wrong")
          // Handle error in registration
        }
      );
    }else{
      console.log(" info arent valid ");
      this.showFailure("info arent valid");
    }
  }






  showSuccess(msg : any) {
    this.toastr.success(msg, 'Toastr fun!',{ timeOut: 5000 });
  }


  
  showFailure(message : any){
    this.toastr.error(message,'error');
  }


}
