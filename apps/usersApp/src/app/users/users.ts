import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { USERS } from '@my-workspace/shared-ui';
import { User, Address, FormData, emptyForm } from '../models/userModels';

@Component({
  selector: 'lib-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Users {
  users: User[] = [...USERS] as User[];
  expandedUsers: Record<number, boolean> = {};

  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  selectedUser: User | null = null;
  formData: FormData = emptyForm();
  formError = '';

  genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  constructor(private router: Router) {}

  toggleDetails(id: number) {
    this.expandedUsers[id] = !this.expandedUsers[id];
  }

  viewTasks(id: number, event: Event) {
    event.stopPropagation();
    this.router.navigate(['users','profile-tasks', id]);
  }

  openAddModal() {
    this.modalMode = 'add';
    this.formData = emptyForm();
    this.formError = '';
    this.showModal = true;
  }

  openEditModal(user: User, event: Event) {
    event.stopPropagation();
    this.modalMode = 'edit';
    this.selectedUser = user;
    this.formData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone ?? '',
      gender: user.gender ?? '',
      dateOfBirth: user.dateOfBirth ?? '',
      address: user.address
        ? { ...user.address }
        : { street: '', city: '', state: '', country: '', zip: '' }
    };
    this.formError = '';
    this.showModal = true;
  }

  deleteUser(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== id);
      delete this.expandedUsers[id];
    }
  }

  saveUser() {
    this.formError = '';
    const { id, name, email, phone, gender, dateOfBirth, address } = this.formData;

    if (!id && id !== 0) { this.formError = 'ID is required.'; return; }
    if (!name.trim())    { this.formError = 'Name is required.'; return; }
    if (!email.trim() || !this.isValidEmail(email)) {
      this.formError = 'A valid email is required.'; return;
    }

    const user: User = {
      id: id!,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      gender,
      dateOfBirth,
      address: { ...address }
    };

    if (this.modalMode === 'add') {
      if (this.users.some(u => u.id === id)) {
        this.formError = `A user with ID ${id} already exists.`; return;
      }
      this.users = [...this.users, user];
    } else {
      this.users = this.users.map(u => u.id === this.selectedUser?.id ? user : u);
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
    this.formError = '';
  }

  formatAddress(address: Address | undefined): string {
    if (!address) return '—';
    return [address.street, address.city, address.state, address.zip, address.country]
      .filter(Boolean)
      .join(', ');
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}