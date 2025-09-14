
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  if (auth.isAuthenticated()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};

export const roleGuard = (roles: string[]) => () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  
  const currentUser = auth.currentUserValue;
  if (currentUser && roles.includes(currentUser.role)) {
    return true;
  }
  
  router.navigate(['/dashboard']);
  return false;
};