import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-testimonials',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './testimonials.component.html',
	styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {}
