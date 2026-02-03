import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ============================================
// SCHEMA DEFINITIONS - Config-driven approach
// ============================================

type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'file' | 'photo';

interface ValidationRule {
	type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'fileSize' | 'fileType';
	value?: any;
	message: string;
}

interface SelectOption {
	value: string;
	label: string;
	icon?: string;
}

interface FieldSchema {
	key: string;
	type: FieldType;
	label: string;
	placeholder?: string;
	validation?: ValidationRule[];
	options?: SelectOption[];
	accept?: string;
	multiple?: boolean;
	rows?: number;
	icon?: string;
	hint?: string;
}

interface FormSection {
	id: string;
	title: string;
	description: string;
	icon: string;
	fields: FieldSchema[];
}

interface FormConfig {
	sections: FormSection[];
}

// ============================================
// FORM DATA INTERFACE
// ============================================

interface FormData {
	// Section 1: Media Upload
	profilePhoto: File | null;
	documents: File[];
	
	// Section 2: Basic Info
	fullName: string;
	email: string;
	phone: string;
	company: string;
	position: string;
	bio: string;
	
	// Section 3: Preferences
	startDate: string;
	category: string;
	priority: string;
	notificationMethod: string;
	agreeTerms: boolean;
	agreeMarketing: boolean;
}

@Component({
	selector: 'app-form',
	imports: [CommonModule, FormsModule],
	templateUrl: './form.html',
	styleUrl: './form.css',
})
export class Form {
	// ============================================
	// FORM CONFIGURATION - Schema-driven rendering
	// ============================================

	formConfig: FormConfig = {
		sections: [
			{
				id: 'media',
				title: 'Media & Documents',
				description: 'Upload your profile photo and related documents',
				icon: '📁',
				fields: [
					{
						key: 'profilePhoto',
						type: 'photo',
						label: 'Profile Photo',
						accept: 'image/*',
						hint: 'Recommended: 400x400px, max 5MB',
						validation: [
							{ type: 'fileSize', value: 5242880, message: 'File size must be less than 5MB' },
							{ type: 'fileType', value: ['image/jpeg', 'image/png', 'image/webp'], message: 'Only JPG, PNG, WebP allowed' }
						]
					},
					{
						key: 'documents',
						type: 'file',
						label: 'Supporting Documents',
						accept: '.pdf,.doc,.docx,.xls,.xlsx',
						multiple: true,
						hint: 'PDF, DOC, XLS files up to 10MB each',
						validation: [
							{ type: 'fileSize', value: 10485760, message: 'Each file must be less than 10MB' }
						]
					}
				]
			},
			{
				id: 'info',
				title: 'Personal Information',
				description: 'Fill in your contact and professional details',
				icon: '👤',
				fields: [
					{
						key: 'fullName',
						type: 'text',
						label: 'Full Name',
						placeholder: 'Enter your full name',
						icon: '👤',
						validation: [
							{ type: 'required', message: 'Full name is required' },
							{ type: 'minLength', value: 2, message: 'Name must be at least 2 characters' }
						]
					},
					{
						key: 'email',
						type: 'email',
						label: 'Email Address',
						placeholder: 'your@email.com',
						icon: '✉️',
						validation: [
							{ type: 'required', message: 'Email is required' },
							{ type: 'email', message: 'Please enter a valid email' }
						]
					},
					{
						key: 'phone',
						type: 'tel',
						label: 'Phone Number',
						placeholder: '+1 (555) 000-0000',
						icon: '📱',
						validation: [
							{ type: 'required', message: 'Phone number is required' }
						]
					},
					{
						key: 'company',
						type: 'text',
						label: 'Company',
						placeholder: 'Your company name',
						icon: '🏢'
					},
					{
						key: 'position',
						type: 'text',
						label: 'Position',
						placeholder: 'Your role or title',
						icon: '💼'
					},
					{
						key: 'bio',
						type: 'textarea',
						label: 'Bio',
						placeholder: 'Tell us about yourself...',
						rows: 4,
						hint: 'Max 500 characters',
						validation: [
							{ type: 'maxLength', value: 500, message: 'Bio cannot exceed 500 characters' }
						]
					}
				]
			},
			{
				id: 'preferences',
				title: 'Preferences & Settings',
				description: 'Configure your preferences and options',
				icon: '⚙️',
				fields: [
					{
						key: 'startDate',
						type: 'date',
						label: 'Preferred Start Date',
						icon: '📅',
						validation: [
							{ type: 'required', message: 'Please select a date' }
						]
					},
					{
						key: 'category',
						type: 'select',
						label: 'Category',
						placeholder: 'Select a category',
						icon: '📂',
						options: [
							{ value: 'general', label: 'General', icon: '📋' },
							{ value: 'business', label: 'Business', icon: '💼' },
							{ value: 'personal', label: 'Personal', icon: '👤' },
							{ value: 'education', label: 'Education', icon: '📚' },
							{ value: 'other', label: 'Other', icon: '📌' }
						],
						validation: [
							{ type: 'required', message: 'Please select a category' }
						]
					},
					{
						key: 'priority',
						type: 'select',
						label: 'Priority Level',
						icon: '🎯',
						options: [
							{ value: 'low', label: 'Low Priority', icon: '🟢' },
							{ value: 'medium', label: 'Medium Priority', icon: '🟡' },
							{ value: 'high', label: 'High Priority', icon: '🟠' },
							{ value: 'urgent', label: 'Urgent', icon: '🔴' }
						]
					},
					{
						key: 'notificationMethod',
						type: 'radio',
						label: 'Notification Preference',
						icon: '🔔',
						options: [
							{ value: 'email', label: 'Email notifications', icon: '✉️' },
							{ value: 'sms', label: 'SMS notifications', icon: '📱' },
							{ value: 'push', label: 'Push notifications', icon: '🔔' },
							{ value: 'none', label: 'No notifications', icon: '🔕' }
						],
						validation: [
							{ type: 'required', message: 'Please select notification preference' }
						]
					},
					{
						key: 'agreeTerms',
						type: 'checkbox',
						label: 'I agree to the Terms of Service and Privacy Policy',
						validation: [
							{ type: 'required', message: 'You must agree to the terms' }
						]
					},
					{
						key: 'agreeMarketing',
						type: 'checkbox',
						label: 'I want to receive marketing communications and updates'
					}
				]
			}
		]
	};

	// ============================================
	// STATE MANAGEMENT
	// ============================================

	formData = signal<FormData>({
		profilePhoto: null,
		documents: [],
		fullName: '',
		email: '',
		phone: '',
		company: '',
		position: '',
		bio: '',
		startDate: '',
		category: '',
		priority: '',
		notificationMethod: '',
		agreeTerms: false,
		agreeMarketing: false
	});

	errors = signal<Record<string, string>>({});
	touched = signal<Record<string, boolean>>({});
	submitted = signal(false);
	isSubmitting = signal(false);
	activeSection = signal(0);
	
	// Photo preview
	photoPreview = signal<string | null>(null);
	dragOver = signal(false);
	dragOverFiles = signal(false);
	
	// Duplicate notification
	duplicateNotification = signal<string | null>(null);

	// Computed values
	progress = computed(() => {
		const data = this.formData();
		const fields = ['fullName', 'email', 'phone', 'startDate', 'category', 'notificationMethod', 'agreeTerms'];
		const filled = fields.filter(key => {
			const value = data[key as keyof FormData];
			return value !== '' && value !== null && value !== false;
		}).length;
		return Math.round((filled / fields.length) * 100);
	});

	isValid = computed(() => Object.keys(this.errors()).length === 0);

	// ============================================
	// VALIDATION LOGIC
	// ============================================

	validateField(field: FieldSchema, value: any): string | null {
		if (!field.validation) return null;

		for (const rule of field.validation) {
			switch (rule.type) {
				case 'required':
					if (field.type === 'checkbox' && !value) return rule.message;
					if (field.type === 'file' && (!value || (Array.isArray(value) && value.length === 0))) return rule.message;
					if (typeof value === 'string' && !value.trim()) return rule.message;
					if (value === null || value === undefined) return rule.message;
					break;
				case 'email':
					if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return rule.message;
					break;
				case 'minLength':
					if (value && value.length < rule.value) return rule.message;
					break;
				case 'maxLength':
					if (value && value.length > rule.value) return rule.message;
					break;
				case 'pattern':
					if (value && !new RegExp(rule.value).test(value)) return rule.message;
					break;
				case 'fileSize':
					if (value instanceof File && value.size > rule.value) return rule.message;
					if (Array.isArray(value)) {
						const oversized = value.find((f: File) => f.size > rule.value);
						if (oversized) return rule.message;
					}
					break;
				case 'fileType':
					if (value instanceof File && !rule.value.includes(value.type)) return rule.message;
					break;
			}
		}
		return null;
	}

	validateForm(): boolean {
		const newErrors: Record<string, string> = {};
		
		for (const section of this.formConfig.sections) {
			for (const field of section.fields) {
				const value = this.formData()[field.key as keyof FormData];
				const error = this.validateField(field, value);
				if (error) newErrors[field.key] = error;
			}
		}

		this.errors.set(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	// ============================================
	// FORM HANDLERS
	// ============================================

	updateField(key: keyof FormData, value: any) {
		this.formData.update((data: FormData) => ({ ...data, [key]: value }));
		this.touched.update((t: Record<string, boolean>) => ({ ...t, [key]: true }));
		
		// Clear error on change
		if (this.errors()[key]) {
			this.errors.update((err: Record<string, string>) => {
				const newErr = { ...err };
				delete newErr[key];
				return newErr;
			});
		}
	}

	// Photo upload handlers
	onPhotoDrop(event: DragEvent) {
		event.preventDefault();
		this.dragOver.set(false);
		const file = event.dataTransfer?.files[0];
		if (file && file.type.startsWith('image/')) {
			// Check for duplicate
			const currentPhoto = this.formData().profilePhoto;
			if (currentPhoto && currentPhoto.name === file.name && currentPhoto.size === file.size) {
				this.showDuplicateNotification(`Photo "${file.name}" is already uploaded`);
				return;
			}
			this.setPhoto(file);
		}
	}

	onPhotoSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			// Check for duplicate
			const currentPhoto = this.formData().profilePhoto;
			if (currentPhoto && currentPhoto.name === file.name && currentPhoto.size === file.size) {
				this.showDuplicateNotification(`Photo "${file.name}" is already uploaded`);
				input.value = '';
				return;
			}
			this.setPhoto(file);
		}
	}

	setPhoto(file: File) {
		this.updateField('profilePhoto', file);
		const reader = new FileReader();
		reader.onload = (e) => {
			this.photoPreview.set(e.target?.result as string);
		};
		reader.readAsDataURL(file);
	}

	removePhoto() {
		this.updateField('profilePhoto', null);
		this.photoPreview.set(null);
	}

	// File upload handlers
	onFilesDrop(event: DragEvent) {
		event.preventDefault();
		this.dragOverFiles.set(false);
		const files = Array.from(event.dataTransfer?.files || []);
		this.addFiles(files);
	}

	onFilesSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		const files = Array.from(input.files || []);
		this.addFiles(files);
		input.value = '';
	}

	addFiles(files: File[]) {
		const currentDocs = this.formData().documents;
		const newFiles: File[] = [];
		const duplicates: string[] = [];

		for (const file of files) {
				const isDuplicate = currentDocs.some((d: File) => d.name === file.name && d.size === file.size);
			if (isDuplicate) {
				duplicates.push(file.name);
			} else {
				newFiles.push(file);
			}
		}

		if (duplicates.length > 0) {
			this.showDuplicateNotification(`File${duplicates.length > 1 ? 's' : ''} already uploaded: ${duplicates.join(', ')}`);
		}

		if (newFiles.length > 0) {
			this.updateField('documents', [...currentDocs, ...newFiles]);
		}
	}

	showDuplicateNotification(message: string) {
		this.duplicateNotification.set(message);
		setTimeout(() => this.duplicateNotification.set(null), 4000);
	}

	removeFile(index: number) {
		const docs = [...this.formData().documents];
		docs.splice(index, 1);
		this.updateField('documents', docs);
	}

	formatFileSize(bytes: number): string {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
		return (bytes / 1048576).toFixed(1) + ' MB';
	}

	getFileIcon(file: File): string {
		const type = file.type;
		if (type.includes('pdf')) return '📄';
		if (type.includes('word') || type.includes('document')) return '📝';
		if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
		if (type.includes('image')) return '🖼️';
		return '📎';
	}

	// Section navigation
	setActiveSection(index: number) {
		this.activeSection.set(index);
	}

	nextSection() {
		if (this.activeSection() < this.formConfig.sections.length - 1) {
			this.activeSection.update((s: number) => s + 1);
		}
	}

	prevSection() {
		if (this.activeSection() > 0) {
			this.activeSection.update((s: number) => s - 1);
		}
	}

	// Validation error summary
	validationSummary = signal<{ sectionIndex: number; sectionTitle: string; errors: string[] }[]>([]);
	showValidationSummary = signal(false);

	// Get section index for a field
	getSectionIndexForField(fieldKey: string): number {
		for (let i = 0; i < this.formConfig.sections.length; i++) {
			const section = this.formConfig.sections[i];
			if (section.fields.some(f => f.key === fieldKey)) {
				return i;
			}
		}
		return 0;
	}

	// Build validation summary
	buildValidationSummary(): { sectionIndex: number; sectionTitle: string; errors: string[] }[] {
		const errors = this.errors();
		const summary: { sectionIndex: number; sectionTitle: string; errors: string[] }[] = [];
		
		for (let i = 0; i < this.formConfig.sections.length; i++) {
			const section = this.formConfig.sections[i];
			const sectionErrors: string[] = [];
			
			for (const field of section.fields) {
				if (errors[field.key]) {
					sectionErrors.push(`${field.label}: ${errors[field.key]}`);
				}
			}
			
			if (sectionErrors.length > 0) {
				summary.push({
					sectionIndex: i,
					sectionTitle: section.title,
					errors: sectionErrors
				});
			}
		}
		
		return summary;
	}

	// Submit
	async submitForm() {
		this.showValidationSummary.set(false);
		
		if (this.validateForm()) {
			this.isSubmitting.set(true);
			
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			this.isSubmitting.set(false);
			this.submitted.set(true);
			
			// Scroll to top to show success message
			window.scrollTo({ top: 0, behavior: 'smooth' });
			
			setTimeout(() => this.resetForm(), 5000);
		} else {
			// Navigate to first section with errors
			const summary = this.buildValidationSummary();
			if (summary.length > 0) {
				this.activeSection.set(summary[0].sectionIndex);
			}
		}
	}

	// Navigate to section with error
	goToSectionWithError(sectionIndex: number) {
		this.activeSection.set(sectionIndex);
		this.showValidationSummary.set(false);
	}

	resetForm() {
		this.formData.set({
			profilePhoto: null,
			documents: [],
			fullName: '',
			email: '',
			phone: '',
			company: '',
			position: '',
			bio: '',
			startDate: '',
			category: '',
			priority: '',
			notificationMethod: '',
			agreeTerms: false,
			agreeMarketing: false
		});
		this.errors.set({});
		this.touched.set({});
		this.submitted.set(false);
		this.photoPreview.set(null);
		this.activeSection.set(0);
	}
}
