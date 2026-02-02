import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface GalleryItem {
	id: number;
	title: string;
	description: string;
	category: string;
	imageUrl: string;
	tags: string[];
}

@Component({
	selector: 'app-gallery',
	imports: [CommonModule],
	templateUrl: './gallery.html',
	styleUrl: './gallery.css',
})
export class Gallery {
	items = signal<GalleryItem[]>([
		{
			id: 1,
			title: 'Mountain Landscape',
			description: 'Beautiful mountain scenery at sunrise',
			category: 'Nature',
			imageUrl:
				'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
			tags: ['mountain', 'landscape', 'nature'],
		},
		{
			id: 2,
			title: 'Ocean Waves',
			description: 'Serene ocean waves crashing on the shore',
			category: 'Nature',
			imageUrl:
				'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=500&fit=crop',
			tags: ['ocean', 'beach', 'water'],
		},
		{
			id: 3,
			title: 'Forest Trail',
			description: 'Peaceful forest path through the woods',
			category: 'Nature',
			imageUrl:
				'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=500&fit=crop',
			tags: ['forest', 'trail', 'nature'],
		},
		{
			id: 4,
			title: 'City Skyline',
			description: 'Urban cityscape at night',
			category: 'Urban',
			imageUrl:
				'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=500&fit=crop',
			tags: ['city', 'skyline', 'urban'],
		},
		{
			id: 5,
			title: 'Sunset Silhouette',
			description: 'Dramatic sunset with silhouette',
			category: 'Sky',
			imageUrl:
				'https://images.unsplash.com/photo-1495567720989-cebfcc6b3e9c?w=500&h=500&fit=crop',
			tags: ['sunset', 'sky', 'silhouette'],
		},
		{
			id: 6,
			title: 'Desert Dunes',
			description: 'Golden desert landscape',
			category: 'Desert',
			imageUrl:
				'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop',
			tags: ['desert', 'sand', 'landscape'],
		},
	]);

	selectedCategory = signal<string | null>(null);
	selectedItem = signal<GalleryItem | null>(null);

	getCategories(): string[] {
		return [...new Set(this.items().map((item) => item.category))];
	}

	getFilteredItems(): GalleryItem[] {
		if (!this.selectedCategory()) {
			return this.items();
		}
		return this.items().filter((item) => item.category === this.selectedCategory());
	}

	selectItem(item: GalleryItem) {
		this.selectedItem.set(item);
	}

	closeModal() {
		this.selectedItem.set(null);
	}

	nextItem() {
		const current = this.selectedItem();
		if (!current) return;

		const filtered = this.getFilteredItems();
		const currentIndex = filtered.findIndex((item) => item.id === current.id);
		const nextIndex = (currentIndex + 1) % filtered.length;
		this.selectedItem.set(filtered[nextIndex]);
	}

	prevItem() {
		const current = this.selectedItem();
		if (!current) return;

		const filtered = this.getFilteredItems();
		const currentIndex = filtered.findIndex((item) => item.id === current.id);
		const prevIndex = currentIndex === 0 ? filtered.length - 1 : currentIndex - 1;
		this.selectedItem.set(filtered[prevIndex]);
	}
}
