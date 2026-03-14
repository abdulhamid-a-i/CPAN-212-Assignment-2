import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  fullName = "";
  email = "";
  password = "";
  role = "resident";
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async register() {

    if (!this.fullName || !this.email || !this.password) {
      this.errorMessage = "All fields are required";
      return;
    }

    try {
      await this.auth.register({
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        role: this.role
      });

      console.log('Registration successful');

      this.errorMessage = '';
      this.router.navigate(['/']);

    } catch (err) {
      console.error('Registration error:', err);
      this.errorMessage = 'Registration failed: email might already be taken';
    }
  }
}