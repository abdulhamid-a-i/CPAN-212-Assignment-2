import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.api}/login`, data, { withCredentials: true });
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.api}/logout`, {}, { withCredentials: true });
  }

  me(): Observable<User> {
  return this.http.get<User>(`${this.api}/me`, { withCredentials: true });
  }
}