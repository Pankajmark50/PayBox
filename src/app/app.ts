import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { Dashboard } from './dashboard/dashboard';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signup, Signin, Dashboard,RouterLink,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected title = 'PayBox';
  isloggedin = false;

  ngOnInit(): void{
    this.isloggedin=Boolean(sessionStorage.getItem("isloggedin"));
  }

  received(event: any){
    this.isloggedin=event;
  }
}
