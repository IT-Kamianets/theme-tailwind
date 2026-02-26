import { Component, signal } from '@angular/core';
import { AboutComponent } from '../../components/about/about.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { FinalCtaComponent } from '../../components/final-cta/final-cta.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import {
	ListItemData,
	ListItemsSectionComponent,
} from '../../components/list-items-section/list-items-section.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { ShowcaseComponent } from '../../components/showcase/showcase.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { TrustBarComponent } from '../../components/trust-bar/trust-bar.component';
import { UseCasesComponent } from '../../components/use-cases/use-cases.component';
@Component({
	imports: [
		HeroComponent,
		TrustBarComponent,
		AboutComponent,
		FeaturesComponent,
		HowItWorksComponent,
		ShowcaseComponent,
		UseCasesComponent,
		TestimonialsComponent,
		PricingComponent,
		FaqComponent,
		FinalCtaComponent,
		ListItemsSectionComponent,
	],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	// Додаємо дані для секції (можна скопіювати з ListComponent або взяти частину)
	featuredItems = signal<ListItemData[]>([
		{
			id: 1,
			name: 'Product Alpha',
			description: 'High-quality product with premium features',
			category: 'Electronics',
			date: '2026-02-01',
			icon: '⚡',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
		},
		{
			id: 2,
			name: 'Product Beta',
			description: 'Affordable solution for everyday needs',
			category: 'Accessories',
			date: '2026-01-28',
			icon: '🎁',
			image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=300&fit=crop',
		},
		{
			id: 3,
			name: 'Product Gamma',
			description: 'Advanced technology meets elegant design',
			category: 'Electronics',
			date: '2026-01-25',
			icon: '✨',
			image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
		},
	]);
}
