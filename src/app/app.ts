import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signup } from './signup/signup';
import { Signin } from './signin/signin';
import { Dashboard } from './dashboard/dashboard';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Signup, Signin, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'PayBox';
}
