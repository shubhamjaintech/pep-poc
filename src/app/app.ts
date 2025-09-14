
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
 templateUrl:'./app.html'
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user = signal<any>(null);

  ngOnInit() {
    this.authService.currentUser.subscribe(u => this.user.set(u));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  canRegister() {
    return ['admin', 'manager', 'technician', 'receptionist'].includes(this.user()?.role);
  }

  canManage() {
    return ['admin', 'manager'].includes(this.user()?.role);
  }

  isAdmin() {
    return this.user()?.role === 'admin';
  }
}