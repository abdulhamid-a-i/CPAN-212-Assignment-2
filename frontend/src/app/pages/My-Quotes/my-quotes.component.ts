import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { QuoteService } from '../../services/quote.service';
import { RequestService } from '../../services/request.service';
import { AuthService } from '../../services/auth.service';
import { Quote } from '../../models/quote.model';
import { ServiceRequest } from '../../models/request.model';
import { User } from '../../models/user.model';

interface QuoteWithRequest extends Quote {
  requestTitle?: string;
  requestIdValue?: string;
}

@Component({
  selector: 'app-my-quotes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.css'
})
export class MyQuotesComponent implements OnInit {

  private quoteService = inject(QuoteService);
  private requestService = inject(RequestService);
  private router = inject(Router);
  private authService = inject(AuthService);

  quotes: QuoteWithRequest[] = [];
  currentUser: User | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadMyQuotes();
  }

  loadMyQuotes(): void {

    this.requestService.getRequests().subscribe({
      next: (requests: ServiceRequest[]) => {
        requests.forEach(request => {
          this.quoteService.getQuotesForRequest(request._id).subscribe({
            next: (quotes) => {
              const quotesWithRequest = quotes.map(q => ({
                ...q,
                requestTitle: request.title,
                requestIdValue: request._id
              }));
              this.quotes.push(...quotesWithRequest);
            },
            error: () => {
              console.error("Failed to load quotes for request", request._id);
            }
          });
        });
      },
      error: () => {
        this.errorMessage = 'Unable to load requests.';
      }

    });
  }
  
  loadCurrentUser(): void {
    this.authService.me().subscribe({
      next: (res) => {
        this.currentUser = res.user;
        if(this.currentUser.role != 'provider'){
        this.router.navigate(['/requests']);
        }
      },
      error: () => {
        this.errorMessage = 'Unable to load current user.';
      }
    });
  }
}