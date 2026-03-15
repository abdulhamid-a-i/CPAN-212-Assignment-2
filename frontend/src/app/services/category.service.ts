import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/categories`;

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api, { withCredentials: true });
  }

  createCategory(payload: { name: string; description?: string }): Observable<Category> {
    return this.http.post<Category>(this.api, payload, {
      withCredentials: true
    });
  }

}