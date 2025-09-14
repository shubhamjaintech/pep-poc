
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'./dashboard.html'
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private serviceService = inject(ServiceService);

  services = signal<any[]>([]);
  stats = signal({ total: 0, pending: 0, inProgress: 0, completed: 0 });

  ngOnInit() {
    this.serviceService.getServices().subscribe(services => {
      this.services.set(services);
      this.calculateStats(services);
    });
  }

  calculateStats(services: any[]) {
    const stats = {
      total: services.length,
      pending: services.filter(s => s.status === 'pending').length,
      inProgress: services.filter(s => s.status === 'in-progress').length,
      completed: services.filter(s => s.status === 'completed').length
    };
    this.stats.set(stats);
  }

  getStatusColor(status: string): string {
    switch(status) {
      case 'pending': return '#ffc107';
      case 'in-progress': return '#17a2b8';
      case 'completed': return '#28a745';
      default: return '#666';
    }
  }

canRegister(): boolean {
  const user = this.auth.currentUserValue;
  return user ? ['admin', 'manager', 'technician', 'receptionist'].includes(user.role) : false;
}
}