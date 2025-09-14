
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'technician' | 'receptionist';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private users = [
    { id: '1', email: 'admin@pepboys.com', name: 'John Admin', role: 'admin' as const, password: 'admin123' },
    { id: '2', email: 'manager@pepboys.com', name: 'Sarah Manager', role: 'manager' as const, password: 'manager123' },
    { id: '3', email: 'tech@pepboys.com', name: 'Mike Tech', role: 'technician' as const, password: 'tech123' },
    { id: '4', email: 'reception@pepboys.com', name: 'Lisa Front', role: 'receptionist' as const, password: 'reception123' }
  ];

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.users.find(u => u.id === token);
      if (user) {
        this.currentUserSubject.next({ id: user.id, email: user.email, name: user.name, role: user.role });
      }
    }
  }
get currentUserValue(): User | null {
  return this.currentUserSubject.value;
}
  login(email: string, password: string): Observable<User> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name, role: user.role };
      localStorage.setItem('token', user.id);
      this.currentUserSubject.next(userData);
      return of(userData).pipe(delay(500));
    }
    return throwError(() => new Error('Invalid credentials')).pipe(delay(500));
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
