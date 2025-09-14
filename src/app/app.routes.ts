// routes.ts
import { Routes } from '@angular/router';
import { authGuard, roleGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'register-service',
    loadComponent: () => import('./components/service-registration/service-registration.component').then(m => m.RegisterServiceComponent),
    canActivate: [authGuard, roleGuard(['admin', 'manager', 'technician', 'receptionist'])]
  },
  {
    path: 'manage-services',
    loadComponent: () => import('./components/service-management/service-management.component').then(m => m.ManageServicesComponent),
    canActivate: [authGuard, roleGuard(['admin', 'manager'])]
  },
  {
    path: 'users',
    loadComponent: () => import('./components/user-management/user-management.component').then(m => m.UsersComponent),
    canActivate: [authGuard, roleGuard(['admin'])]
  },
  { path: '**', redirectTo: '/dashboard' }
];