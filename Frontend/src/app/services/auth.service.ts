import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Normal User',
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
    },
  ];
  apiEndpoint = environment.apiEndpoint;

  private currentUser!: {
    role: String;
    token: String;
    expiresIn: number;
  } | null;

  constructor(private router: Router, private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // Login with email
  login(email: string, password: string): Observable<boolean> {
    const payload = { email, password };
    console.log(payload);
    return this.http.post<any>(`${this.apiEndpoint}auth/login`, payload).pipe(
      tap((user) => {
        console.log(user);
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate([user.role === 'User' ? '/user' : '/admin']);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  // Register with name, email, password, and role
  register(
    name: string,
    email: string,
    password: string,
    role: 'Admin' | 'User'
  ): Observable<string> {
    const payload = { name, email, password, role };

    return this.http.post<any>(`${this.apiEndpoint}auth/signup`, payload).pipe(
      tap((response) => {
        console.log('User registered successfully:', response);
        this.currentUser = {
          token: response.token,
          expiresIn: response.expiresIn,
          role: response.role,
        };
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.router.navigate([role === 'Admin' ? '/admin' : '/user']);
      }),
      map(() => 'Registration successful'),
      catchError((error) => {
        console.error('Registration failed:', error);
        return of('Registration failed. Please try again.');
      })
    );
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    // Remove user data from local storage
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  // Get the current logged-in user's role
  getCurrentUserRole(): 'Admin' | 'User' | 'Guest' {
    return this.currentUser
      ? (this.currentUser.role as 'Admin' | 'User' | 'Guest')
      : 'Guest';
  }

  // Reset password by email
  resetPassword(email: string): boolean {
    const user = this.users.find((u) => u.email === email);
    if (user) {
      // Simulate sending a reset link
      console.log(`Reset link sent to ${email}`);
      return true;
    } else {
      console.error('Email not found');
      return false;
    }
  }

  getCurrentUser() {
    return this.currentUser || { id: 0, email: '', role: 'guest' };
  }
}
