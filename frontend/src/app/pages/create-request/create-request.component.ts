import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RequestFormComponent } from '../../components/request-form/request-form.component';
import { RequestService } from '../../services/request.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [CommonModule, RequestFormComponent],
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent {
  private requestService = inject(RequestService);
  private router = inject(Router);
  private authService = inject(AuthService);

  successMessage = '';
  errorMessage = '';
  currentUser: User | null = null;

  ngOnInit(): void {
    this.loadCurrentUser();
    if (this.currentUser?.role !== "resident"){
      this.router.navigate(['/requests']);
    }
  }

  handleSubmit(payload: {
    title: string;
    description: string;
    categoryId: string;
    location: string;
  }): void {
    this.requestService.createRequest(payload).subscribe({
      next: (request) => {
        this.successMessage = 'Request created successfully.';
        this.errorMessage = '';
        this.router.navigate(['/requests', request._id]);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to create request.';
        this.successMessage = '';
      }
    });
  }

    loadCurrentUser(): void {
    this.authService.me().subscribe({
      next: (res) => {
        this.currentUser = res.user;
        console.log(this.currentUser.role)
      },
      error: () => {
        this.errorMessage = 'Unable to load current user.';
      }
    });
  }
}
