import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'lib-profile-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-tasks.html',
  styleUrl: './profile-tasks.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileTasks implements OnInit {
  user: User | null = null;
  tasks: Task[] = [];

  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  selectedTask: Task | null = null;
  formData: FormData = emptyForm();
  formError = '';

  priorityOptions: Priority[] = ['High', 'Medium', 'Low'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = (USERS as User[]).find(u => u.id === id) ?? null;
    this.tasks = (TASKS as Task[]).filter(t => t.userId === id);
  }

  goBack() {
    this.router.navigate(['users']);
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
      this.tasks = this.tasks.filter(t => t.id !== id);
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
        userId: this.user!.id,
        title: title.trim(),
        description: description.trim(),
        priority: priority as Priority
      };
      this.tasks = [...this.tasks, newTask];
    } else {
      this.tasks = this.tasks.map(t =>
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