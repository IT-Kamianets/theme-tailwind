import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	protected readonly year = new Date().getFullYear();

	protected readonly companyLinks = [
		{ label: 'AboutComponent Us', routerLink: '/' },
		{ label: 'Our Team', routerLink: '/' },
		{ label: 'Careers', routerLink: '/' },
		{ label: 'Blog', routerLink: '/content' },
	];

	protected readonly productLinks = [
		{ label: 'FeaturesComponent', routerLink: '/' },
		{ label: 'PricingComponent', routerLink: '/' },
		{ label: 'Demo', routerLink: '/' },
		{ label: 'API Docs', routerLink: '/' },
	];

	protected readonly supportLinks = [
		{ label: 'Help Center', routerLink: '/' },
		{ label: 'Contact Us', routerLink: '/' },
		{ label: 'FAQ', routerLink: '/' },
		{ label: 'Status', routerLink: '/' },
	];

	protected readonly legalLinks = [
		{ label: 'Privacy Policy', routerLink: '/' },
		{ label: 'Terms of Service', routerLink: '/' },
		{ label: 'Cookie Policy', routerLink: '/' },
	];

	protected readonly socialLinks = [
		{ id: 'twitter', label: 'Twitter', url: 'https://twitter.com' },
		{ id: 'facebook', label: 'Facebook', url: 'https://facebook.com' },
		{ id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
		{ id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
		{ id: 'github', label: 'GitHub', url: 'https://github.com' },
	];
}
