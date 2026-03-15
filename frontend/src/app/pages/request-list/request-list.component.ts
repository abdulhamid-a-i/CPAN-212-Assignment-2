import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RequestService } from '../../services/request.service';
import { ServiceRequest } from '../../models/request.model';
import { RequestCardComponent } from '../../components/request-card/request-card.component';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RequestCardComponent],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  private requestService = inject(RequestService);
  private authService = inject(AuthService);

  requests: ServiceRequest[] = [];
  loading = false;
  errorMessage = '';
  currentUser: User | null = null;

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;

    this.requestService.getRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load requests.';
        this.loading = false;
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
