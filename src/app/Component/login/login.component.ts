import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder,private route : Router,private toastr : ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log("clicked");
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const user = this.loginForm.value;

      this.userService.login(user).subscribe(
        (response: any) => {
          console.log('User loged in successfully', response);
          console.log(response.id);
          localStorage.setItem("id",response.Id);
          
          this.route.navigate(['/booking']);
          // Handle successful registration
        },
        (error: any) => {
          this.showFailure(' login failed ');
          console.error('Error login user', error);
          // Handle error in registration
        }
      );
    }else{
      console.log(" info arent valid ");
      this.showFailure("info arent correct");
    }
  }


  showSuccess(msg : any) {
    this.toastr.success(msg, 'Toastr fun!',{ timeOut: 5000 });
  }


  
  showFailure(message : any){
    this.toastr.error(message,'error');
  }



}
