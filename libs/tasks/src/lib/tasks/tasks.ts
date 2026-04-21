import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TASKS } from '@my-workspace/shared-ui';

interface Task {
  id: number;
  name: string;
  title: string[];
  [key: string]: any;
}

@Component({
  selector: 'lib-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tasks {
  tasks: Task[] = [...TASKS];

  // Modal state
  showModal = false;
  modalMode: 'add' | 'edit' = 'add';
  selectedTask: Task | null = null;

  formData: { id: number | null; name: string; titles: string[] } = {
    id: null,
    name: '',
    titles: ['']
  };

  formError = '';

  // ─── Add ───────────────────────────────────────────────
  openAddModal() {
    this.modalMode = 'add';
    this.formData = { id: null, name: '', titles: [''] };
    this.formError = '';
    this.showModal = true;
  }

  // ─── Edit ──────────────────────────────────────────────
  openEditModal(task: Task) {
    this.modalMode = 'edit';
    this.selectedTask = task;
    this.formData = {
      id: task.id,
      name: task.name,
      titles: [...task.title]
    };
    this.formError = '';
    this.showModal = true;
  }

  // ─── Delete ────────────────────────────────────────────
  deleteTask(id: number) {
    if (confirm('Are you sure you want to delete this task group?')) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }

  // ─── Title items management ────────────────────────────
  addTitleItem() {
    this.formData.titles = [...this.formData.titles, ''];
  }

  removeTitleItem(index: number) {
    if (this.formData.titles.length > 1) {
      this.formData.titles = this.formData.titles.filter((_, i) => i !== index);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }

  updateTitle(index: number, value: string) {
    const updated = [...this.formData.titles];
    updated[index] = value;
    this.formData.titles = updated;
  }

  // ─── Save (Add or Edit) ────────────────────────────────
  saveTask() {
    this.formError = '';

    const { id, name, titles } = this.formData;

    if (id === null || id === undefined) {
      this.formError = 'ID is required.';
      return;
    }
    if (!name.trim()) {
      this.formError = 'Task group name is required.';
      return;
    }
    const cleanTitles = titles.map(t => t.trim()).filter(t => t.length > 0);
    if (cleanTitles.length === 0) {
      this.formError = 'At least one task title is required.';
      return;
    }

    if (this.modalMode === 'add') {
      const idExists = this.tasks.some(t => t.id === id);
      if (idExists) {
        this.formError = `A task group with ID ${id} already exists.`;
        return;
      }
      this.tasks = [...this.tasks, { id: id!, name: name.trim(), title: cleanTitles }];
    } else {
      this.tasks = this.tasks.map(t =>
        t.id === this.selectedTask?.id
          ? { ...t, id: id!, name: name.trim(), title: cleanTitles }
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
}