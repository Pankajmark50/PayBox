import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Services, SignupModel } from '../services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  providers: [Services],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  constructor(private services: Services, private routes: Router){}

  signupModel = new SignupModel();
  Data:any;

  onSignupSubmit(form: SignupModel) {
    this.services.signupdetail(form).subscribe(data=>{
      this.Data = data.result;
      alert(data.response);
      this.routes.navigate(["/signin"]);
    })
  }

}
