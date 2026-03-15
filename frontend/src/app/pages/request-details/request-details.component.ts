import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RequestService } from '../../services/request.service';
import { QuoteService } from '../../services/quote.service';
import { AuthService } from '../../services/auth.service';

import { ServiceRequest } from '../../models/request.model';
import { Quote } from '../../models/quote.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-request-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-details.component.html',
  styleUrl: './request-details.component.css'
})


export class RequestDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private requestService = inject(RequestService);
  private quoteService = inject(QuoteService);
  private authService = inject(AuthService);

  request: ServiceRequest | null = null;
  quotes: Quote[] = [];
  currentUser: User | null = null;
  requestId = '';


  successMessage = '';
  errorMessage = '';

  quoteForm = this.fb.group({
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    message: ['', [Validators.required, Validators.minLength(5)]],
    daysToComplete: [null as number | null, [Validators.required, Validators.min(1)]]
  });

  ngOnInit(): void {
    this.requestId = this.route.snapshot.paramMap.get('id') || '';

    this.loadCurrentUser();
    this.loadRequest();
    this.loadQuotes();
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

  loadRequest(): void {
    this.requestService.getRequestById(this.requestId).subscribe({
      next: (data) => {
        this.request = data;
      },
      error: () => {
        this.errorMessage = 'Unable to load request details.';
      }
    });
  }

  loadQuotes(): void {
    this.quoteService.getQuotesForRequest(this.requestId).subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: () => {
        this.errorMessage = 'Unable to load quotes.';
      }
    });
  }

  get createdName(): string {
  if (!this.request) return '';
  if (typeof this.request.createdBy === 'object' && this.request.createdBy?.fullName) {
    return this.request.createdBy.fullName;
  }
  return 'Unknown Resident';
}

  get isProvider(): boolean {
    return this.currentUser?.role === 'provider';
  }

  get isResident(): boolean {
    return this.currentUser?.role === 'resident';
  }

  getProviderName(quote: Quote): string {
    if (typeof quote.providerId === 'object') {
      return quote.providerId.fullName;
    }
    return 'Unknown Provider';
}

  get categoryName(): string {
  if (!this.request) return '';
  if (typeof this.request.categoryId === 'object' && this.request.categoryId?.name) {
    return this.request.categoryId.name;
  }
  return 'Unknown Category';
}

  submitQuote(): void {
    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }

    const payload = {
      price: this.quoteForm.value.price!,
      message: this.quoteForm.value.message!,
      daysToComplete: this.quoteForm.value.daysToComplete!
    };

    this.quoteService.createQuote(this.requestId, payload).subscribe({
      next: () => {
        this.successMessage = 'Quote submitted successfully.';
        this.errorMessage = '';
        this.quoteForm.reset();
        this.loadQuotes();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to submit quote.';
        this.successMessage = '';
      }
    });
  }

  acceptQuote(quoteId: string): void {
    this.quoteService.acceptQuote(quoteId).subscribe({
      next: () => {
        this.successMessage = 'Quote accepted successfully.';
        this.errorMessage = '';
        this.loadQuotes();
        this.loadRequest();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to accept quote.';
        this.successMessage = '';
      }
    });
  }

  UpdateRequest(status: string): void {
    this.requestService.updateStatus(this.requestId,{status: status}).subscribe({
      next: () => {
        this.successMessage = 'Request completed'
        this.errorMessage = '';
        this.loadQuotes();
        this.loadRequest();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to complete request.';
        this.successMessage = '';
      }

    })
  }
}