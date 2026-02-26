import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemData } from '../../components/list-items-section/list-items-section.component';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
})
export class ProfileComponent {
	product = signal<ListItemData>({
		id: 1,
		name: 'Product Alpha',
		description: 'This is a high-quality product designed to meet all your professional needs. It features premium materials, an ergonomic design, and industry-leading performance specifications.',
		category: 'Electronics',
		date: '2026-02-01',
		icon: '⚡',
		image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
	});

	addToCart(): void {
		console.log('Added to cart:', this.product().name);
		alert('Product added to cart!');
	}
}