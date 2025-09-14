
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private servicesSubject = new BehaviorSubject<any[]>([
    {
      id: '1',
      customerName: 'c1ient A',
      vehicleInfo: '2020 Toyota Camry',
      serviceType: 'oil-change',
      status: 'completed',
      cost: 45.99,
      priority: 'medium',
      description: 'Regular oil change',
      createdAt: new Date(Date.now() - 86400000)
    },
    {
      id: '2',
      customerName: 'client B',
      vehicleInfo: '2019 Honda Civic',
      serviceType: 'brake-repair',
      status: 'in-progress',
      cost: 250.00,
      priority: 'high',
      description: 'Replace brake pads',
      createdAt: new Date(Date.now() - 43200000)
    }
  ]);

  getServices(): Observable<any[]> {
    return this.servicesSubject.asObservable();
  }

  createService(service: any): Observable<any> {
    const currentServices = this.servicesSubject.value;
    const newServices = [...currentServices, service];
    this.servicesSubject.next(newServices);
    return of(service).pipe(delay(1000));
  }

  updateServiceStatus(id: string, status: string): Observable<any> {
    const services = this.servicesSubject.value.map(s => 
      s.id === id ? { ...s, status } : s
    );
    this.servicesSubject.next(services);
    return of({ id, status }).pipe(delay(500));
  }
}
