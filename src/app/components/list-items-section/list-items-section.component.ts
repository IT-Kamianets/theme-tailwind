import { Component, Input, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Імпорт Router
import { ListItemComponent } from '../list-item/list-item.component';

export interface ListItemData {
	id: number;
	name: string;
	description: string;
	category: string;
	date: string;
	icon: string;
	image: string;
}

@Component({
	selector: 'app-list-items-section',
	standalone: true,
	imports: [CommonModule, ListItemComponent],
	templateUrl: './list-items-section.component.html',
	styleUrl: './list-items-section.component.scss',
})
export class ListItemsSectionComponent {
	@Input() items: ListItemData[] = [];
	@Input() title: string = 'Items';
	@Input() showSearch: boolean = true;
	@Input() itemsPerRow: number = 3;
	@Input() maxItems: number = 0;
	@Input() showViewAllButton: boolean = false;

	// 2. Інжектимо Router для навігації
	private router = inject(Router);

	searchQuery = signal('');

	// Обчислюємо відфільтровані елементи (пошук)
	filteredItems = computed(() => {
		const query = this.searchQuery().toLowerCase();
		if (!query) return this.items;
		return this.items.filter(item => 
			item.name.toLowerCase().includes(query) || 
			item.description.toLowerCase().includes(query)
		);
	});

	// Обчислюємо елементи для відображення (ліміт maxItems)
	displayItems = computed(() => {
		const items = this.filteredItems();
		if (this.maxItems > 0) {
			return items.slice(0, this.maxItems);
		}
		return items;
	});

	clearSearch() {
		this.searchQuery.set('');
	}

	// 3. Метод, що викликається при кліку на кнопку "View All"
	onViewAllClick() {
		this.router.navigate(['/list']);
	}
}