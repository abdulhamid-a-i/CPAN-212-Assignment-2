import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api/requests';

  getRequests(filters?: { status?: string; categoryId?: string; q?: string }): Observable<ServiceRequest[]> {
    let params = new HttpParams();

    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    if (filters?.categoryId) {
      params = params.set('categoryId', filters.categoryId);
    }

    if (filters?.q) {
      params = params.set('q', filters.q);
    }

    return this.http.get<ServiceRequest[]>(this.api, {
      params,
      withCredentials: true
    });
  }

  getRequestById(id: string): Observable<ServiceRequest> {
    return this.http.get<ServiceRequest>(`${this.api}/${id}`, {
      withCredentials: true
    });
  }

  createRequest(payload: {
    title: string;
    description: string;
    categoryId: string;
    location: string;
  }): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.api, payload, {
      withCredentials: true
    });
  }

  updateStatus(id: string, payload: {
    status: string
  }): Observable<ServiceRequest>{
    return this.http.patch<ServiceRequest>(`${this.api}/${id}/status`, payload, {
      withCredentials: true
    });
  }
}