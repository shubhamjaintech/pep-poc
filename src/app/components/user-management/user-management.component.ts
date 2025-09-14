import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./user-management.html'
})
export class UsersComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  showForm = signal(false);
  users = signal([
    { id: '1', name: 'Pep Admin', email: 'admin@pepboys.com', role: 'admin', active: true },
    { id: '2', name: 'Pep Manager', email: 'manager@pepboys.com', role: 'manager', active: true },
    { id: '3', name: 'Pep Tech', email: 'tech@pepboys.com', role: 'technician', active: true },
    { id: '4', name: 'Pep Front', email: 'reception@pepboys.com', role: 'receptionist', active: false }
  ]);

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required]
  });

addUser() {
  if (this.userForm.valid) {
    const formValue = this.userForm.value;
    const newUser = {
      id: Date.now().toString(),
      name: formValue.name as string,
      email: formValue.email as string, 
      role: formValue.role as string,
      active: true
    };
    this.users.update(users => [...users, newUser]);
    this.userForm.reset();
    this.showForm.set(false);
  }
}

  toggleUser(user: any) {
    this.users.update(users => 
      users.map(u => u.id === user.id ? { ...u, active: !u.active } : u)
    );
  }
}