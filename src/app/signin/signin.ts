import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [FormsModule,RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css'
})
export class Signin {


  onSubmit() {
    alert("Signed in successfully!");
  }

}
