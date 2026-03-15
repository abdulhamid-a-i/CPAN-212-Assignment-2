import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  authService = inject(AuthService);
  router = inject(Router);

  currentUser: User | null = null;

  ngOnInit(): void {
    this.loadCurrentUser();
  }
  
  async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadCurrentUser(): void {
    this.authService.me().subscribe({
      next: (res) => {
        this.currentUser = res.user;
        console.log(this.currentUser.role)
      },
      error: () => {
        return null
      }
    });
  }

  get UserName(): string {
    if (!this.currentUser) return '';
    return this.currentUser.fullName;
  }
}
