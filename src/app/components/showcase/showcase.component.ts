import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-showcase',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './showcase.component.html',
	styleUrl: './showcase.component.scss',
})
export class ShowcaseComponent {}
