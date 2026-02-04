import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItem } from '../list-item/list-item';
import type { ListItemData } from '../list-item/list-item';

export type { ListItemData };

@Component({
	selector: 'app-list-items-section',
	imports: [CommonModule, ListItem],
	templateUrl: './list-items-section.html',
	styleUrl: './list-items-section.css',
})
export class ListItemsSection {
	@Input() items: ListItemData[] = [];
	@Input() title: string = 'Items';
	@Input() showSearch: boolean = true;
	@Input() itemsPerRow: number = 3;
	@Input() maxItems: number = 0; // 0 means show all
	@Input() showViewAllButton: boolean = true;
	@Output() viewAllClick = new EventEmitter<void>();

	selectedItems = signal<Set<number>>(new Set());
	searchQuery = signal<string>('');

	get displayItems(): ListItemData[] {
		const filtered = this.filteredItems;
		if (this.maxItems > 0) {
			return filtered.slice(0, this.maxItems);
		}
		return filtered;
	}

	get filteredItems(): ListItemData[] {
		const query = this.searchQuery().toLowerCase();
		return this.items.filter(
			(item) =>
				item.name.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query) ||
				item.category.toLowerCase().includes(query)
		);
	}

	onItemSelect(item: ListItemData): void {
		const selected = new Set(this.selectedItems());
		if (selected.has(item.id)) {
			selected.delete(item.id);
		} else {
			selected.add(item.id);
		}
		this.selectedItems.set(selected);
	}

	isItemSelected(itemId: number): boolean {
		return this.selectedItems().has(itemId);
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

	clearSearch(): void {
		this.searchQuery.set('');
	}

	onViewAllClick(): void {
		this.viewAllClick.emit();
	}
}

