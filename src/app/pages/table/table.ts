import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

// ============================================
// SCHEMA DEFINITIONS - Config-driven approach
// ============================================

type ColumnType = 'text' | 'number' | 'currency' | 'date' | 'status' | 'badge';
type SortDirection = 'asc' | 'desc' | null;

interface ColumnSchema {
	key: string;
	label: string;
	type: ColumnType;
	sortable?: boolean;
	filterable?: boolean;
	width?: string;
	align?: 'left' | 'center' | 'right';
	editable?: boolean;
	inputType?: 'text' | 'email' | 'tel' | 'number' | 'date' | 'select';
	options?: { value: string; label: string }[];
}

interface FilterOption {
	value: string;
	label: string;
	icon?: string;
}

interface FilterSchema {
	key: string;
	label: string;
	type: 'select' | 'search';
	options?: FilterOption[];
	placeholder?: string;
}

interface BadgeConfig {
	value: string;
	bgColor: string;
	textColor: string;
}

interface ValidationRule {
	type: 'required' | 'email' | 'minLength' | 'maxLength' | 'min' | 'max' | 'pattern';
	value?: any;
	message: string;
}

interface FieldValidation {
	[key: string]: ValidationRule[];
}

interface TableConfig {
	title: string;
	subtitle: string;
	columns: ColumnSchema[];
	filters: FilterSchema[];
	badges: BadgeConfig[];
	addButtonLabel: string;
	editModalTitle: string;
	deleteModalTitle: string;
	currencySymbol: string;
	dateLocale: string;
}

// ============================================
// DATA INTERFACE - Generic Record
// ============================================

interface TableRecord {
	id: number;
	[key: string]: any;
}

@Component({
	selector: 'app-table',
	imports: [CommonModule, FormsModule],
	templateUrl: './table.html',
	styleUrl: './table.css',
})
export class Table {
	// ============================================
	// TABLE CONFIGURATION - Schema-driven rendering
	// ============================================

	tableConfig: TableConfig = {
		title: 'Data Table Template',
		subtitle: 'Manage and view records with filtering, sorting, and CRUD operations',
		addButtonLabel: 'Add New Record',
		editModalTitle: 'Edit Record',
		deleteModalTitle: 'Delete Record',
		currencySymbol: '$',
		dateLocale: 'en-US',
		columns: [
			{ key: 'firstName', label: 'First Name', type: 'text', editable: true, inputType: 'text' },
			{ key: 'lastName', label: 'Last Name', type: 'text', editable: true, inputType: 'text' },
			{ key: 'phone', label: 'Phone', type: 'text', editable: true, inputType: 'tel' },
			{ key: 'email', label: 'Email', type: 'text', editable: true, inputType: 'email' },
			{ key: 'role', label: 'Role', type: 'text', filterable: true, editable: true, inputType: 'select', options: [
				{ value: 'Developer', label: 'Developer' },
				{ value: 'Designer', label: 'Designer' },
				{ value: 'Manager', label: 'Manager' },
				{ value: 'Analyst', label: 'Analyst' },
				{ value: 'Support', label: 'Support' },
			]},
			{ key: 'department', label: 'Department', type: 'badge', filterable: true, editable: true, inputType: 'select', options: [
				{ value: 'Engineering', label: 'Engineering' },
				{ value: 'Design', label: 'Design' },
				{ value: 'Marketing', label: 'Marketing' },
				{ value: 'Sales', label: 'Sales' },
				{ value: 'HR', label: 'HR' },
			]},
			{ key: 'salary', label: 'Salary', type: 'currency', sortable: true, align: 'center', editable: true, inputType: 'number' },
			{ key: 'startDate', label: 'Start Date', type: 'date', sortable: true, editable: true, inputType: 'date' },
		],
		filters: [
			{
				key: 'search',
				label: 'Search',
				type: 'search',
				placeholder: 'Search by name...'
			},
			{
				key: 'role',
				label: 'Role',
				type: 'select',
				options: [
					{ value: '', label: 'All Roles' },
					{ value: 'Developer', label: 'Developer' },
					{ value: 'Designer', label: 'Designer' },
					{ value: 'Manager', label: 'Manager' },
					{ value: 'Analyst', label: 'Analyst' },
					{ value: 'Support', label: 'Support' },
				]
			},
			{
				key: 'department',
				label: 'Department',
				type: 'select',
				options: [
					{ value: '', label: 'All Departments' },
					{ value: 'Engineering', label: 'Engineering' },
					{ value: 'Design', label: 'Design' },
					{ value: 'Marketing', label: 'Marketing' },
					{ value: 'Sales', label: 'Sales' },
					{ value: 'HR', label: 'HR' },
				]
			}
		],
		badges: [
			{ value: 'Engineering', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
			{ value: 'Design', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
			{ value: 'Marketing', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
			{ value: 'Sales', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
			{ value: 'HR', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
		]
	};

	// ============================================
	// VALIDATION CONFIGURATION
	// ============================================

	validationRules: FieldValidation = {
		firstName: [
			{ type: 'required', message: 'First name is required' },
			{ type: 'minLength', value: 2, message: 'Minimum 2 characters' }
		],
		lastName: [
			{ type: 'required', message: 'Last name is required' },
			{ type: 'minLength', value: 2, message: 'Minimum 2 characters' }
		],
		email: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: 'Invalid email format' }
		],
		phone: [
			{ type: 'required', message: 'Phone is required' }
		],
		role: [
			{ type: 'required', message: 'Role is required' }
		],
		department: [
			{ type: 'required', message: 'Department is required' }
		],
		salary: [
			{ type: 'required', message: 'Salary is required' },
			{ type: 'min', value: 0, message: 'Salary must be positive' }
		],
		startDate: [
			{ type: 'required', message: 'Start date is required' }
		]
	};

	// ============================================
	// SAMPLE DATA
	// ============================================

	tableData = signal<TableRecord[]>([
		{ id: 1, firstName: 'John', lastName: 'Smith', phone: '+1 555-0101', email: 'john.smith@example.com', role: 'Developer', department: 'Engineering', salary: 85000, startDate: '2023-03-15' },
		{ id: 2, firstName: 'Sarah', lastName: 'Johnson', phone: '+1 555-0102', email: 'sarah.j@example.com', role: 'Designer', department: 'Design', salary: 72000, startDate: '2022-08-20' },
		{ id: 3, firstName: 'Michael', lastName: 'Williams', phone: '+1 555-0103', email: 'michael.w@example.com', role: 'Manager', department: 'Engineering', salary: 95000, startDate: '2021-01-10' },
		{ id: 4, firstName: 'Emily', lastName: 'Brown', phone: '+1 555-0104', email: 'emily.b@example.com', role: 'Analyst', department: 'Marketing', salary: 65000, startDate: '2024-02-28' },
		{ id: 5, firstName: 'David', lastName: 'Miller', phone: '+1 555-0105', email: 'david.m@example.com', role: 'Developer', department: 'Engineering', salary: 88000, startDate: '2023-11-05' },
		{ id: 6, firstName: 'Jessica', lastName: 'Davis', phone: '+1 555-0106', email: 'jessica.d@example.com', role: 'Support', department: 'HR', salary: 52000, startDate: '2024-06-12' },
		{ id: 7, firstName: 'Robert', lastName: 'Wilson', phone: '+1 555-0107', email: 'robert.w@example.com', role: 'Manager', department: 'Sales', salary: 92000, startDate: '2020-09-18' },
	]);

	// ============================================
	// STATE MANAGEMENT
	// ============================================

	// Filters
	searchQuery = signal('');
	filterValues = signal<Record<string, string>>({});

	// Sorting (3 states: null -> asc -> desc -> null)
	sortColumn = signal<string | null>(null);
	sortDirection = signal<SortDirection>(null);

	// Edit modal
	isEditModalOpen = signal(false);
	editingRecord = signal<TableRecord | null>(null);
	editFormData = signal<Partial<TableRecord>>({});
	editFormErrors = signal<Record<string, string>>({});

	// Delete confirmation
	isDeleteModalOpen = signal(false);
	deletingRecord = signal<TableRecord | null>(null);

	// Notifications
	notification = signal<{ message: string; type: 'success' | 'error' } | null>(null);

	// ============================================
	// COMPUTED VALUES
	// ============================================

	filteredAndSortedData = computed(() => {
		let data = [...this.tableData()];

		// Apply search filter
		const search = this.searchQuery().toLowerCase().trim();
		if (search) {
			data = data.filter(item =>
				item['firstName']?.toLowerCase().includes(search) ||
				item['lastName']?.toLowerCase().includes(search)
			);
		}

		// Apply dynamic filters from filterValues
		const filters = this.filterValues();
		for (const [key, value] of Object.entries(filters)) {
			if (value) {
				data = data.filter(item => item[key]?.toString().includes(value));
			}
		}

		// Apply sorting
		const column = this.sortColumn();
		const direction = this.sortDirection();
		if (column && direction) {
			data.sort((a, b) => {
				let valueA = a[column];
				let valueB = b[column];

				// Handle date comparison
				const colConfig = this.tableConfig.columns.find(c => c.key === column);
				if (colConfig?.type === 'date') {
					valueA = new Date(valueA as string).getTime();
					valueB = new Date(valueB as string).getTime();
				}

				// Handle string comparison
				if (typeof valueA === 'string' && typeof valueB === 'string') {
					valueA = valueA.toLowerCase();
					valueB = valueB.toLowerCase();
				}

				if (valueA < valueB) return direction === 'asc' ? -1 : 1;
				if (valueA > valueB) return direction === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return data;
	});

	totalRecords = computed(() => this.tableData().length);
	filteredRecords = computed(() => this.filteredAndSortedData().length);

	// ============================================
	// VALIDATION LOGIC
	// ============================================

	validateField(key: string, value: any): string | null {
		const rules = this.validationRules[key];
		if (!rules) return null;

		for (const rule of rules) {
			switch (rule.type) {
				case 'required':
					if (value === null || value === undefined || value === '' || 
						(typeof value === 'number' && isNaN(value))) {
						return rule.message;
					}
					break;
				case 'email':
					if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						return rule.message;
					}
					break;
				case 'minLength':
					if (value && value.length < rule.value) {
						return rule.message;
					}
					break;
				case 'maxLength':
					if (value && value.length > rule.value) {
						return rule.message;
					}
					break;
				case 'min':
					if (typeof value === 'number' && value < rule.value) {
						return rule.message;
					}
					break;
				case 'max':
					if (typeof value === 'number' && value > rule.value) {
						return rule.message;
					}
					break;
				case 'pattern':
					if (value && !new RegExp(rule.value).test(value)) {
						return rule.message;
					}
					break;
			}
		}
		return null;
	}

	validateEditForm(): boolean {
		const formData = this.editFormData();
		const errors: Record<string, string> = {};

		for (const column of this.tableConfig.columns) {
			if (column.editable) {
				const error = this.validateField(column.key, formData[column.key]);
				if (error) {
					errors[column.key] = error;
				}
			}
		}

		this.editFormErrors.set(errors);
		return Object.keys(errors).length === 0;
	}

	getFieldError(key: string): string {
		return this.editFormErrors()[key] || '';
	}

	hasFieldError(key: string): boolean {
		return !!this.editFormErrors()[key];
	}

	// ============================================
	// SORTING LOGIC (3 states)
	// ============================================

	toggleSort(columnKey: string) {
		const column = this.tableConfig.columns.find(c => c.key === columnKey);
		if (!column?.sortable) return;

		const currentColumn = this.sortColumn();
		const currentDirection = this.sortDirection();

		if (currentColumn !== columnKey) {
			// New column: start with ascending
			this.sortColumn.set(columnKey);
			this.sortDirection.set('asc');
		} else {
			// Same column: cycle through states
			if (currentDirection === 'asc') {
				this.sortDirection.set('desc');
			} else if (currentDirection === 'desc') {
				this.sortColumn.set(null);
				this.sortDirection.set(null);
			} else {
				this.sortDirection.set('asc');
			}
		}
	}

	getSortIcon(columnKey: string): string {
		if (this.sortColumn() !== columnKey) return '↕';
		if (this.sortDirection() === 'asc') return '↑';
		if (this.sortDirection() === 'desc') return '↓';
		return '↕';
	}

	// ============================================
	// FILTER HANDLERS
	// ============================================

	updateSearch(value: string) {
		this.searchQuery.set(value);
	}

	updateFilter(key: string, value: string) {
		this.filterValues.update((f: Record<string, string>) => ({ ...f, [key]: value }));
	}

	clearFilters() {
		this.searchQuery.set('');
		this.filterValues.set({});
	}

	hasActiveFilters(): boolean {
		const filters = this.filterValues();
		return !!(this.searchQuery() || Object.values(filters).some(v => v));
	}

	getFilterValue(key: string): string {
		return this.filterValues()[key] || '';
	}

	// ============================================
	// CRUD OPERATIONS
	// ============================================

	// Edit
	openEditModal(record: TableRecord) {
		this.editingRecord.set(record);
		this.editFormData.set({ ...record });
		this.editFormErrors.set({});
		this.isEditModalOpen.set(true);
	}

	closeEditModal() {
		this.isEditModalOpen.set(false);
		this.editingRecord.set(null);
		this.editFormData.set({});
		this.editFormErrors.set({});
	}

	updateEditField(key: string, value: any) {
		this.editFormData.update((data: Partial<TableRecord>) => ({ ...data, [key]: value }));
		// Clear error on change
		if (this.editFormErrors()[key]) {
			this.editFormErrors.update((err: Record<string, string>) => {
				const newErr = { ...err };
				delete newErr[key];
				return newErr;
			});
		}
	}

	saveRecord() {
		if (!this.validateEditForm()) {
			return;
		}

		const formData = this.editFormData();
		
		if (formData['id']) {
			// Update existing
			this.tableData.update((data: TableRecord[]) =>
				data.map((rec: TableRecord) => rec.id === formData['id'] ? { ...rec, ...formData } as TableRecord : rec)
			);
			this.showNotification('Record updated successfully!', 'success');
		} else {
			// Add new
			const newId = Math.max(0, ...this.tableData().map((r: TableRecord) => r.id)) + 1;
			this.tableData.update((data: TableRecord[]) => [...data, { ...formData, id: newId } as TableRecord]);
			this.showNotification('Record added successfully!', 'success');
		}

		this.closeEditModal();
	}

	// Delete
	openDeleteModal(record: TableRecord) {
		this.deletingRecord.set(record);
		this.isDeleteModalOpen.set(true);
	}

	closeDeleteModal() {
		this.isDeleteModalOpen.set(false);
		this.deletingRecord.set(null);
	}

	confirmDelete() {
		const record = this.deletingRecord();
		if (!record) return;

		this.tableData.update((data: TableRecord[]) => data.filter((rec: TableRecord) => rec.id !== record.id));
		this.showNotification('Record deleted successfully!', 'success');
		this.closeDeleteModal();
	}

	// Add new record
	addNewRecord() {
		const newRecord: TableRecord = { id: 0 };
		for (const col of this.tableConfig.columns) {
			if (col.type === 'currency' || col.type === 'number') {
				newRecord[col.key] = 0;
			} else if (col.type === 'date') {
				newRecord[col.key] = new Date().toISOString().split('T')[0];
			} else {
				newRecord[col.key] = '';
			}
		}
		this.openEditModal(newRecord);
	}

	// ============================================
	// UTILITY METHODS
	// ============================================

	getBadgeColors(value: string): { bg: string; text: string } {
		const badge = this.tableConfig.badges.find(b => b.value === value);
		return badge 
			? { bg: badge.bgColor, text: badge.textColor }
			: { bg: 'bg-slate-100', text: 'text-slate-700' };
	}

	formatCurrency(value: number): string {
		return this.tableConfig.currencySymbol + new Intl.NumberFormat('en-US', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value);
	}

	formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString(this.tableConfig.dateLocale, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	showNotification(message: string, type: 'success' | 'error') {
		this.notification.set({ message, type });
		setTimeout(() => this.notification.set(null), 3000);
	}

	getCellValue(record: TableRecord, column: ColumnSchema): string {
		const value = record[column.key];
		if (value === null || value === undefined) return '';
		
		switch (column.type) {
			case 'currency':
				return this.formatCurrency(value);
			case 'date':
				return this.formatDate(value);
			default:
				return value.toString();
		}
	}

	getColumnByKey(key: string): ColumnSchema | undefined {
		return this.tableConfig.columns.find(c => c.key === key);
	}

	// Track function for ngFor
	trackById(index: number, item: TableRecord): number {
		return item.id;
	}
}
