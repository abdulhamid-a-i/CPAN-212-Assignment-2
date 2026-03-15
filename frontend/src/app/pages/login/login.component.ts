import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  async login() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = "Email and password are required";
      this.cdr.detectChanges();
      return;
    }

    try {
      await this.auth.login({
        email: this.email,
        password: this.password
      });

      this.router.navigate(['/requests']);

    } catch {
      console.log("error caught")
      this.errorMessage = 'Invalid email or password';
      this.cdr.detectChanges();
    }
  }
}