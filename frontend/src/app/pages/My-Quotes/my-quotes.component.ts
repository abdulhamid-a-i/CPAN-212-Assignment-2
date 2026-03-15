import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { QuoteService } from '../../services/quote.service';
import { RequestService } from '../../services/request.service';

import { Quote } from '../../models/quote.model';
import { ServiceRequest } from '../../models/request.model';

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

  quotes: QuoteWithRequest[] = [];
  errorMessage = '';

  ngOnInit(): void {
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
}