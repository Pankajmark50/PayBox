import { Component, EventEmitter,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { Services, LoginModel } from '../services';

@Component({
  selector: 'app-signin',
  imports: [FormsModule,RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {

  constructor(private services: Services, private router: Router){}

  loginModel = new LoginModel();
  Data:any;

  ngOnInit(): void{
    if (Boolean(sessionStorage.getItem("isloggedin")))
    {
        this.router.navigate(['/dashboard']);
    }
  }

  @Output() loginEvent = new EventEmitter<string>();

  send(val:any){
    this.loginEvent.emit(val);
  }

  onLoginSubmit(form: LoginModel) {
    this.services.logindetail(form).subscribe(data=>{
      this.Data = data.result;
      alert(data.response);
      if(data.response=='Login Successfully !!')
      {
        this.send(true);
        sessionStorage.setItem("isloggedin","true");
        sessionStorage.setItem("number",this.Data.phoneNumber);
        this.router.navigate(['/dashboard']);
      }

      else
      {
        this.send(false);
      }
    })
  }

}
