import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { USERS } from '@my-workspace/shared-ui';

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

@Component({
  selector: 'lib-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Users {
  users: User[] = [...USERS];
  expandedUsers: Record<number, boolean> = {};

  // Modal state
  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  selectedUser: User | null = null;

  formData: { id: number | null; name: string; email: string } = {
    id: null,
    name: '',
    email: ''
  };

  formError = '';

  constructor(private router: Router) {}

  toggleDetails(id: number) {
    this.expandedUsers[id] = !this.expandedUsers[id];
  }

  getTasks() {
    this.router.navigate(['tasks']);
  }

  viewTask(id: number) {
    this.router.navigate(['tasks', id])
  }

  // ─── Add ───────────────────────────────────────────────
  openAddModal() {
    this.modalMode = 'add';
    this.formData = { id: null, name: '', email: '' };
    this.formError = '';
    this.showModal = true;
  }

  // ─── Edit ──────────────────────────────────────────────
  openEditModal(user: User) {
    this.modalMode = 'edit';
    this.selectedUser = user;
    this.formData = { id: user.id, name: user.name, email: user.email };
    this.formError = '';
    this.showModal = true;
  }

  // ─── Delete ────────────────────────────────────────────
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== id);
      delete this.expandedUsers[id];
    }
  }

  // ─── Save (Add or Edit) ────────────────────────────────
  saveUser() {
    this.formError = '';

    const { id, name, email } = this.formData;

    if (!id && id !== 0) {
      this.formError = 'ID is required.';
      return;
    }
    if (!name.trim()) {
      this.formError = 'Name is required.';
      return;
    }
    if (!email.trim() || !this.isValidEmail(email)) {
      this.formError = 'A valid email is required.';
      return;
    }

    if (this.modalMode === 'add') {
      const idExists = this.users.some(u => u.id === id);
      if (idExists) {
        this.formError = `A user with ID ${id} already exists.`;
        return;
      }
      this.users = [...this.users, { id: id!, name: name.trim(), email: email.trim() }];
    } else {
      this.users = this.users.map(u =>
        u.id === this.selectedUser?.id
          ? { ...u, id: id!, name: name.trim(), email: email.trim() }
          : u
      );
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
    this.formError = '';
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}