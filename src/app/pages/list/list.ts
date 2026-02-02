import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Item {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
}

@Component({
	selector: 'app-list',
	imports: [CommonModule],
	templateUrl: './list.html',
	styleUrl: './list.css',
})
export class List {
	items = signal<Item[]>([
		{
			id: 1,
			name: 'Product Alpha',
			description: 'High-quality product with premium features',
			category: 'Electronics',
			date: '2026-02-01',
		},
		{
			id: 2,
			name: 'Product Beta',
			description: 'Affordable solution for everyday needs',
			category: 'Accessories',
			date: '2026-01-28',
		},
		{
			id: 3,
			name: 'Product Gamma',
			description: 'Advanced technology meets elegant design',
			category: 'Electronics',
			date: '2026-01-25',
		},
		{
			id: 4,
			name: 'Product Delta',
			description: 'Essential item for professionals',
			category: 'Tools',
			date: '2026-01-20',
		},
	]);

	selectedItem = signal<Item | null>(null);

	selectItem(item: Item) {
		this.selectedItem.set(item);
	}

	clearSelection() {
		this.selectedItem.set(null);
	}

	getCategoryColor(category: string): string {
		const colors: Record<string, string> = {
			Electronics: 'bg-blue-100 text-blue-800',
			Accessories: 'bg-purple-100 text-purple-800',
			Tools: 'bg-green-100 text-green-800',
		};
		return colors[category] || 'bg-slate-100 text-slate-800';
	}
}
