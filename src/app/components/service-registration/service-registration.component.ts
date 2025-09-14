import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-register-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./service-register.html'
  
})
export class RegisterServiceComponent {
  private fb = inject(FormBuilder);
  private serviceService = inject(ServiceService);
  private router = inject(Router);

  loading = signal(false);
  error = signal('');

  years = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() - i);
  makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi'];

  serviceForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    year: ['', Validators.required],
    make: ['', Validators.required],
    model: ['', Validators.required],
    licensePlate: ['', Validators.required],
    mileage: ['', Validators.required],
    serviceType: ['', Validators.required],
    priority: ['', Validators.required],
    description: [''],
    cost: ['', Validators.required]
  });

  onSubmit() {
    if (this.serviceForm.valid) {
      this.loading.set(true);
      this.error.set('');

      const serviceData = {
        ...this.serviceForm.value,
        id: Date.now().toString(),
        status: 'pending',
        customerName: `${this.serviceForm.value.firstName} ${this.serviceForm.value.lastName}`,
        vehicleInfo: `${this.serviceForm.value.year} ${this.serviceForm.value.make} ${this.serviceForm.value.model}`,
        createdAt: new Date()
      };

      this.serviceService.createService(serviceData).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.error.set('Failed to register service');
          this.loading.set(false);
        }
      });
    } else {
      Object.keys(this.serviceForm.controls).forEach(key => {
        this.serviceForm.get(key)?.markAsTouched();
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}