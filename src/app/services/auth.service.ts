import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  me() {
    return this.http.get(`${this.api}/me`, { withCredentials: true });
  }
}