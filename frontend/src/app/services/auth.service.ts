import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api = "http://localhost:3000/api/auth";

  user = signal<User | null>(null);
  authenticated = signal(false);


  constructor(private http: HttpClient) {}

  async login(data: any): Promise<User> {
    const response: any = await firstValueFrom(
      this.http.post(`${this.api}/login`, data, { withCredentials: true })
    );

    this.user.set(response.user);
    this.authenticated.set(true);

    return response;
  }

  async register(data: any): Promise<any> {
    return await firstValueFrom(
      this.http.post(`${this.api}/register`, data, { withCredentials: true })
    );
  }

  async logout(): Promise<void> {
    await firstValueFrom(
      this.http.post(`${this.api}/logout`, {}, { withCredentials: true })
    );

    this.user.set(null);
    this.authenticated.set(false);
  }

  me(): Observable<User> {
  return this.http.get<User>(`${this.api}/me`, { withCredentials: true });
  }


}