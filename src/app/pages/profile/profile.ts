import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  bio: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profile = signal<UserProfile>({
    id: 1,
    name: 'John Developer',
    email: 'john@example.com',
    role: 'Senior Developer',
    bio: 'Passionate about building scalable applications and leading development teams.',
    status: 'active',
    joinDate: '2024-01-15',
  });

  isEditing = signal(false);
  editForm = signal<Partial<UserProfile>>({});

  startEdit() {
    this.editForm.set({ ...this.profile() });
    this.isEditing.set(true);
  }

  saveEdit() {
    this.profile.set(this.editForm() as UserProfile);
    this.isEditing.set(false);
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.editForm.set({});
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-slate-100 text-slate-800',
      pending: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-slate-100 text-slate-800';
  }
}
