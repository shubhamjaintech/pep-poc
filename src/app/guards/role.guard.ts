import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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