import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.errorMessage = "Email and password are required";
      return;
    }

    try {
      await this.auth.login({
        email: this.email,
        password: this.password
      });

      this.router.navigate(['/requests']);

    } catch {
      this.errorMessage = 'Invalid email or password';
    }
  }
}