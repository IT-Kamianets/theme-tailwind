import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface FormData {
	name: string;
	email: string;
	phone: string;
	country: string;
	message: string;
	subscribe: boolean;
	terms: boolean;
}

@Component({
	selector: 'app-form',
	imports: [CommonModule, FormsModule],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class Form {
	formData = signal<FormData>({
		name: '',
		email: '',
		phone: '',
		country: '',
		message: '',
		subscribe: false,
		terms: false,
	});

	submitted = signal(false);
	errors = signal<Record<string, string>>({});

	validateForm(): boolean {
		const newErrors: Record<string, string> = {};

		if (!this.formData().name.trim()) {
			newErrors['name'] = 'Name is required';
		}
		if (!this.formData().email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			newErrors['email'] = 'Valid email is required';
		}
		if (!this.formData().phone.trim()) {
			newErrors['phone'] = 'Phone is required';
		}
		if (!this.formData().country) {
			newErrors['country'] = 'Country is required';
		}
		if (!this.formData().terms) {
			newErrors['terms'] = 'You must accept the terms';
		}

		this.errors.set(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	submitForm() {
		if (this.validateForm()) {
			this.submitted.set(true);
			setTimeout(() => this.resetForm(), 3000);
		}
	}

	resetForm() {
		this.formData.set({
			name: '',
			email: '',
			phone: '',
			country: '',
			message: '',
			subscribe: false,
			terms: false,
		});
		this.submitted.set(false);
		this.errors.set({});
	}

	updateFormData(key: keyof FormData, value: any) {
		this.formData.update((data) => ({ ...data, [key]: value }));
		if (this.errors()[key]) {
			this.errors.update((err) => {
				const newErr = { ...err };
				delete newErr[key];
				return newErr;
			});
		}
	}
}
