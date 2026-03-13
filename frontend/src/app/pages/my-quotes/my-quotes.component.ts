import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../models/quote.model';

@Component({
  selector: 'app-my-quotes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.css'
})
export class MyQuotesComponent implements OnInit {
  private quoteService = inject(QuoteService);

  quotes: Quote[] = [];
  errorMessage = '';

  ngOnInit(): void {
    this.loadMyQuotes();
  }

  loadMyQuotes(): void {
    this.quoteService.getMyQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Unable to load my quotes.';
      }
    });
  }
}