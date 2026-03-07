import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { RouterLink } from '@angular/router';

@Component({
  selector:'app-register',
  standalone:true,
  imports:[FormsModule, RouterLink],
  templateUrl:'./register.html',
  styleUrls:['./register.css']
})

export class RegisterComponent {
  fullName = "";
  email = "";
  password = "";
  role = "resident";
  errorMessage: string = '';

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.errorMessage = ''; 
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'Registration failed: email might be taken'; 
      }
    });
  }
}