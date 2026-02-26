import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-pricing',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './pricing.component.html',
	styleUrl: './pricing.component.scss',
})
export class PricingComponent {}
