import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = ''; 

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        this.errorMessage = ''; 
      },
      error: (err) => {
        console.log('Login error:', err);
        this.errorMessage = 'Invalid email or password'; 
      }
    });
  }

}
