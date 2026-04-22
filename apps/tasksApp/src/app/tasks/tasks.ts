import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { USERS, TASKS } from '@my-workspace/shared-ui';

export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string;
  priority: Priority;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
}

type FormData = {
  title: string;
  description: string;
  priority: Priority | '';
};

const emptyForm = (): FormData => ({
  title: '',
  description: '',
  priority: ''
});

@Component({
  selector: 'lib-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tasks implements OnInit {
  allTasks: Task[] = [];
  users: User[] = [];

  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  selectedTask: Task | null = null;
  formData: FormData = emptyForm();
  formError = '';

  priorityOptions: Priority[] = ['High', 'Medium', 'Low'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.users = [...USERS] as User[];
    this.allTasks = [...TASKS] as Task[];
  }

  getUserName(userId: number): string {
    return this.users.find(u => u.id === userId)?.name ?? 'Unknown';
  }

  openAddModal() {
    this.modalMode = 'add';
    this.formData = emptyForm();
    this.formError = '';
    this.showModal = true;
  }

  openEditModal(task: Task) {
    this.modalMode = 'edit';
    this.selectedTask = task;
    this.formData = {
      title: task.title,
      description: task.description,
      priority: task.priority
    };
    this.formError = '';
    this.showModal = true;
  }

  deleteTask(id: number) {
    if (confirm('Delete this task?')) {
      this.allTasks = this.allTasks.filter(t => t.id !== id);
    }
  }

  saveTask() {
    this.formError = '';
    const { title, description, priority } = this.formData;

    if (!title.trim()) { this.formError = 'Title is required.'; return; }
    if (!priority)     { this.formError = 'Please select a priority.'; return; }

    if (this.modalMode === 'add') {
      const newTask: Task = {
        id: Date.now(),
        userId: 0,
        title: title.trim(),
        description: description.trim(),
        priority: priority as Priority
      };
      this.allTasks = [...this.allTasks, newTask];
    } else {
      this.allTasks = this.allTasks.map(t =>
        t.id === this.selectedTask?.id
          ? { ...t, title: title.trim(), description: description.trim(), priority: priority as Priority }
          : t
      );
    }

    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.selectedTask = null;
    this.formError = '';
  }

  priorityClass(priority: Priority): string {
    return { High: 'priority-high', Medium: 'priority-medium', Low: 'priority-low' }[priority];
  }
}