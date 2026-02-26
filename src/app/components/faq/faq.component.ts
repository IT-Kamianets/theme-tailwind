import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-faq',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './faq.component.html',
	styleUrl: './faq.component.scss',
})
export class FaqComponent {}
