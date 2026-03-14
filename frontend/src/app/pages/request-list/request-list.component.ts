import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { ServiceRequest } from '../../models/request.model';
import { RequestCardComponent } from '../../components/request-card/request-card.component';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [CommonModule, RouterModule, RequestCardComponent],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit {
  private requestService = inject(RequestService);

  requests: ServiceRequest[] = [];
  loading = false;
  errorMessage = '';

  ngOnInit(): void {
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
}
