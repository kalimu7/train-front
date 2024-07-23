import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { BookComponent } from './Component/book/book.component';

const routes: Routes = [

  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"booking",component:BookComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
