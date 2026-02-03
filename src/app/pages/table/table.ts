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

interface StatusConfig {
	value: string;
	label: string;
	color: string;
	bgColor: string;
}

interface TableConfig {
	columns: ColumnSchema[];
	filters: FilterSchema[];
	statuses: StatusConfig[];
}

// ============================================
// DATA INTERFACE
// ============================================

interface Employee {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	position: string;
	department: string;
	salary: number;
	hireDate: string;
	status: string;
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
		columns: [
			{ key: 'firstName', label: 'First Name', type: 'text', sortable: false, filterable: true },
			{ key: 'lastName', label: 'Last Name', type: 'text', sortable: false, filterable: true },
			{ key: 'phone', label: 'Phone', type: 'text', sortable: false },
			{ key: 'email', label: 'Email', type: 'text', sortable: false },
			{ key: 'position', label: 'Position', type: 'text', sortable: false, filterable: true },
			{ key: 'department', label: 'Department', type: 'badge', sortable: false, filterable: true },
			{ key: 'salary', label: 'Salary', type: 'currency', sortable: true, align: 'right' },
			{ key: 'hireDate', label: 'Hire Date', type: 'date', sortable: true },
		],
		filters: [
			{
				key: 'search',
				label: 'Search by name',
				type: 'search',
				placeholder: 'Enter name...'
			},
			{
				key: 'position',
				label: 'Position',
				type: 'select',
				options: [
					{ value: '', label: 'All positions' },
					{ value: 'Technician', label: 'Technician', icon: '🔧' },
					{ value: 'Packer', label: 'Packer', icon: '📦' },
					{ value: 'Warehouse', label: 'Warehouse', icon: '🏭' },
					{ value: 'Driver', label: 'Driver', icon: '🚚' },
					{ value: 'Cleaner', label: 'Cleaner', icon: '🧹' },
					{ value: 'Manager', label: 'Manager', icon: '👔' },
				]
			},
			{
				key: 'department',
				label: 'Department',
				type: 'select',
				options: [
					{ value: '', label: 'All departments' },
					{ value: 'Production', label: 'Production', icon: '🏭' },
					{ value: 'Warehouse', label: 'Warehouse', icon: '📦' },
					{ value: 'Logistics', label: 'Logistics', icon: '🚛' },
					{ value: 'Office', label: 'Office', icon: '🏢' },
				]
			}
		],
		statuses: [
			{ value: 'active', label: 'Active', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
			{ value: 'inactive', label: 'Inactive', color: 'text-slate-700', bgColor: 'bg-slate-100' },
			{ value: 'on-leave', label: 'On Leave', color: 'text-amber-700', bgColor: 'bg-amber-100' },
		]
	};

	// Department colors for badges
	departmentColors: Record<string, { bg: string; text: string }> = {
		'Production': { bg: 'bg-blue-100', text: 'text-blue-700' },
		'Warehouse': { bg: 'bg-amber-100', text: 'text-amber-700' },
		'Logistics': { bg: 'bg-purple-100', text: 'text-purple-700' },
		'Office': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
		'Production/Warehouse': { bg: 'bg-cyan-100', text: 'text-cyan-700' },
	};

	// ============================================
	// SAMPLE DATA
	// ============================================

	tableData = signal<Employee[]>([
		{
			id: 1,
			firstName: 'John',
			lastName: 'Smith',
			phone: '+380 11-111-11-11',
			email: 'john.smith@email.com',
			position: 'Technician',
			department: 'Production',
			salary: 30000,
			hireDate: '2024-03-15',
			status: 'active'
		},
		{
			id: 2,
			firstName: 'Michael',
			lastName: 'Johnson',
			phone: '+380 22-222-22-22',
			email: 'michael.j@email.com',
			position: 'Packer',
			department: 'Production',
			salary: 22000,
			hireDate: '2023-11-20',
			status: 'active'
		},
		{
			id: 3,
			firstName: 'David',
			lastName: 'Williams',
			phone: '+380 33-333-33-33',
			email: 'david.w@email.com',
			position: 'Warehouse',
			department: 'Warehouse',
			salary: 24000,
			hireDate: '2022-06-08',
			status: 'active'
		},
		{
			id: 4,
			firstName: 'Andrew',
			lastName: 'Brown',
			phone: '+380 44-444-44-44',
			email: 'andrew.b@email.com',
			position: 'Warehouse',
			department: 'Warehouse',
			salary: 22000,
			hireDate: '2025-01-10',
			status: 'active'
		},
		{
			id: 5,
			firstName: 'Victor',
			lastName: 'Davis',
			phone: '+380 55-555-55-55',
			email: 'victor.d@email.com',
			position: 'Driver',
			department: 'Logistics',
			salary: 35000,
			hireDate: '2021-09-05',
			status: 'active'
		},
		{
			id: 6,
			firstName: 'Daniel',
			lastName: 'Miller',
			phone: '+380 66-666-66-66',
			email: 'daniel.m@email.com',
			position: 'Cleaner',
			department: 'Production/Warehouse',
			salary: 17000,
			hireDate: '2024-07-22',
			status: 'active'
		},
		{
			id: 7,
			firstName: 'Stephen',
			lastName: 'Wilson',
			phone: '+380 77-777-77-77',
			email: 'stephen.w@email.com',
			position: 'Manager',
			department: 'Office',
			salary: 40000,
			hireDate: '2020-02-14',
			status: 'active'
		},
	]);

	// ============================================
	// STATE MANAGEMENT
	// ============================================

	// Filters
	searchQuery = signal('');
	filterPosition = signal('');
	filterDepartment = signal('');

	// Sorting (3 states: null -> asc -> desc -> null)
	sortColumn = signal<string | null>(null);
	sortDirection = signal<SortDirection>(null);

	// Edit modal
	isEditModalOpen = signal(false);
	editingEmployee = signal<Employee | null>(null);
	editFormData = signal<Partial<Employee>>({});

	// Delete confirmation
	isDeleteModalOpen = signal(false);
	deletingEmployee = signal<Employee | null>(null);

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
				item.firstName.toLowerCase().includes(search) ||
				item.lastName.toLowerCase().includes(search)
			);
		}

		// Apply position filter
		const position = this.filterPosition();
		if (position) {
			data = data.filter(item => item.position === position);
		}

		// Apply department filter
		const department = this.filterDepartment();
		if (department) {
			data = data.filter(item => item.department.includes(department));
		}

		// Apply sorting
		const column = this.sortColumn();
		const direction = this.sortDirection();
		if (column && direction) {
			data.sort((a, b) => {
				let valueA = a[column as keyof Employee];
				let valueB = b[column as keyof Employee];

				// Handle date comparison
				if (column === 'hireDate') {
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
		if (key === 'position') {
			this.filterPosition.set(value);
		} else if (key === 'department') {
			this.filterDepartment.set(value);
		}
	}

	clearFilters() {
		this.searchQuery.set('');
		this.filterPosition.set('');
		this.filterDepartment.set('');
	}

	hasActiveFilters(): boolean {
		return !!(this.searchQuery() || this.filterPosition() || this.filterDepartment());
	}

	// ============================================
	// CRUD OPERATIONS
	// ============================================

	// Edit
	openEditModal(employee: Employee) {
		this.editingEmployee.set(employee);
		this.editFormData.set({ ...employee });
		this.isEditModalOpen.set(true);
	}

	closeEditModal() {
		this.isEditModalOpen.set(false);
		this.editingEmployee.set(null);
		this.editFormData.set({});
	}

	updateEditField(key: keyof Employee, value: any) {
		this.editFormData.update(data => ({ ...data, [key]: value }));
	}

	saveEmployee() {
		const formData = this.editFormData();
		if (!formData.id) return;

		this.tableData.update(data =>
			data.map(emp => emp.id === formData.id ? { ...emp, ...formData } as Employee : emp)
		);

		this.showNotification('Record updated successfully!', 'success');
		this.closeEditModal();
	}

	// Delete
	openDeleteModal(employee: Employee) {
		this.deletingEmployee.set(employee);
		this.isDeleteModalOpen.set(true);
	}

	closeDeleteModal() {
		this.isDeleteModalOpen.set(false);
		this.deletingEmployee.set(null);
	}

	confirmDelete() {
		const employee = this.deletingEmployee();
		if (!employee) return;

		this.tableData.update(data => data.filter(emp => emp.id !== employee.id));
		this.showNotification('Record deleted successfully!', 'success');
		this.closeDeleteModal();
	}

	// Add new employee
	addNewEmployee() {
		const newId = Math.max(...this.tableData().map(e => e.id)) + 1;
		const newEmployee: Employee = {
			id: newId,
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			position: '',
			department: '',
			salary: 0,
			hireDate: new Date().toISOString().split('T')[0],
			status: 'active'
		};
		this.openEditModal(newEmployee);
	}

	// ============================================
	// UTILITY METHODS
	// ============================================

	getDepartmentColor(department: string): { bg: string; text: string } {
		return this.departmentColors[department] || { bg: 'bg-slate-100', text: 'text-slate-700' };
	}

	formatCurrency(value: number): string {
		return new Intl.NumberFormat('uk-UA', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(value) + ' ₴';
	}

	formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('uk-UA', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		});
	}

	showNotification(message: string, type: 'success' | 'error') {
		this.notification.set({ message, type });
		setTimeout(() => this.notification.set(null), 3000);
	}

	// Track function for ngFor
	trackById(index: number, item: Employee): number {
		return item.id;
	}
}
