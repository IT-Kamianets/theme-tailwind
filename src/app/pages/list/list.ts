import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Item {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
	icon?: string;
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
			icon: '⚡',
		},
		{
			id: 2,
			name: 'Product Beta',
			description: 'Affordable solution for everyday needs',
			category: 'Accessories',
			date: '2026-01-28',
			icon: '🎁',
		},
		{
			id: 3,
			name: 'Product Gamma',
			description: 'Advanced technology meets elegant design',
			category: 'Electronics',
			date: '2026-01-25',
			icon: '✨',
		},
		{
			id: 4,
			name: 'Product Delta',
			description: 'Essential item for professionals',
			category: 'Tools',
			date: '2026-01-20',
			icon: '🔧',
		},
		{
			id: 5,
			name: 'Product Epsilon',
			description: 'Sustainable and eco-friendly option',
			category: 'Accessories',
			date: '2026-01-18',
			icon: '🌱',
		},
		{
			id: 6,
			name: 'Product Zeta',
			description: 'Premium quality with lifetime warranty',
			category: 'Tools',
			date: '2026-01-15',
			icon: '🏆',
		},
	]);

	selectedItem = signal<Item | null>(null);
	filteredCategory = signal<string>('All');
	categories = signal<string[]>(['All', 'Electronics', 'Accessories', 'Tools']);

	selectItem(item: Item): void {
		this.selectedItem.set(item);
	}

	clearSelection(): void {
		this.selectedItem.set(null);
	}

	filterByCategory(category: string): void {
		this.filteredCategory.set(category);
		this.clearSelection();
	}

	getFilteredItems(): Item[] {
		const cat = this.filteredCategory();
		const allItems = this.items();
		const filtered = cat === 'All' ? allItems : allItems.filter(item => item.category === cat);
		return filtered.sort((a, b) => a.id - b.id);
	}

	getCategoryColor(category: string): string {
		const colorMap: Record<string, string> = {
			Electronics: 'bg-blue-100 text-blue-800',
			Accessories: 'bg-green-100 text-green-800',
			Tools: 'bg-amber-100 text-amber-800',
		};
		return colorMap[category] || 'bg-gray-100 text-gray-800';
	}

	formatId(id: number): string {
		return String(id).padStart(4, '0');
	}
}
