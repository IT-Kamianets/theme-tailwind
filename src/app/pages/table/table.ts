import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface TableData {
	id: number;
	name: string;
	category: string;
	price: number;
	quantity: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
	date: string;
}

@Component({
	selector: 'app-table',
	imports: [CommonModule],
	templateUrl: './table.html',
	styleUrl: './table.css',
})
export class Table {
	tableData = signal<TableData[]>([
		{
			id: 1,
			name: 'Laptop Pro',
			category: 'Electronics',
			price: 1299.99,
			quantity: 45,
			status: 'in-stock',
			date: '2026-02-01',
		},
		{
			id: 2,
			name: 'USB-C Cable',
			category: 'Accessories',
			price: 19.99,
			quantity: 3,
			status: 'low-stock',
			date: '2026-01-28',
		},
		{
			id: 3,
			name: 'Keyboard',
			category: 'Peripherals',
			price: 89.99,
			quantity: 0,
			status: 'out-of-stock',
			date: '2026-01-25',
		},
		{
			id: 4,
			name: 'Monitor 4K',
			category: 'Electronics',
			price: 599.99,
			quantity: 12,
			status: 'in-stock',
			date: '2026-01-20',
		},
		{
			id: 5,
			name: 'Mouse Wireless',
			category: 'Peripherals',
			price: 49.99,
			quantity: 78,
			status: 'in-stock',
			date: '2026-01-15',
		},
	]);

	sortBy = signal<'name' | 'price' | 'quantity'>('name');
	ascending = signal(true);

	getStatusColor(status: string): string {
		const colors: Record<string, string> = {
			'in-stock': 'bg-green-100 text-green-800',
			'low-stock': 'bg-yellow-100 text-yellow-800',
			'out-of-stock': 'bg-red-100 text-red-800',
		};
		return colors[status] || 'bg-slate-100 text-slate-800';
	}

	sort(field: 'name' | 'price' | 'quantity') {
		if (this.sortBy() === field) {
			this.ascending.update((val) => !val);
		} else {
			this.sortBy.set(field);
			this.ascending.set(true);
		}
	}

	getSortedData(): TableData[] {
		const sorted = [...this.tableData()].sort((a, b) => {
			let valueA = a[this.sortBy()] as any;
			let valueB = b[this.sortBy()] as any;

			if (typeof valueA === 'string') {
				valueA = valueA.toLowerCase();
				valueB = (valueB as string).toLowerCase();
			}

			return this.ascending() ? (valueA > valueB ? 1 : -1) : valueA < valueB ? 1 : -1;
		});

		return sorted;
	}
}
