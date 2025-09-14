
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./service-management.html'
})
export class ManageServicesComponent implements OnInit {
  private serviceService = inject(ServiceService);

  services = signal<any[]>([]);
  filteredServices = signal<any[]>([]);
  currentFilter = '';

  ngOnInit() {
    this.serviceService.getServices().subscribe(services => {
      this.services.set(services);
      this.applyFilter();
    });
  }

  filterStatus(event: any) {
    this.currentFilter = event.target.value;
    this.applyFilter();
  }

  applyFilter() {
    const services = this.services();
    if (this.currentFilter) {
      this.filteredServices.set(services.filter(s => s.status === this.currentFilter));
    } else {
      this.filteredServices.set(services);
    }
  }

  updateStatus(id: string, event: any) {
    const newStatus = event.target.value;
    this.serviceService.updateServiceStatus(id, newStatus).subscribe(() => {
      console.log(`Service {id} updated to {newStatus}`);
    });
  }
}
