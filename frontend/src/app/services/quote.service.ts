import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api';

  createQuote(requestId: string, payload: {
    price: number;
    message: string;
    daysToComplete: number;
  }): Observable<Quote> {
    return this.http.post<Quote>(
      `${this.api}/requests/${requestId}/quotes`,
      payload,
      { withCredentials: true }
    );
  }

  getQuotesForRequest(requestId: string): Observable<Quote[]> {
    return this.http.get<Quote[]>(
      `${this.api}/requests/${requestId}/quotes`,
      { withCredentials: true }
    );
  }

  acceptQuote(quoteId: string): Observable<any> {
    return this.http.patch(
      `${this.api}/quotes/${quoteId}/accept`,
      {},
      { withCredentials: true }
    );
  }

  getMyQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(
      `${this.api}/quotes/my`,
      { withCredentials: true }
    );
  }
}