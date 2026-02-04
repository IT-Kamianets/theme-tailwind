import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ListItemData {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
	icon?: string;
	image?: string;
}

@Component({
	selector: 'app-list-item',
	imports: [CommonModule],
	templateUrl: './list-item.html',
	styleUrl: './list-item.css',
})
export class ListItem {
	@Input() item!: ListItemData;
	@Input() isSelected = false;
	@Output() itemSelected = new EventEmitter<ListItemData>();

	onSelect(): void {
		this.itemSelected.emit(this.item);
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
