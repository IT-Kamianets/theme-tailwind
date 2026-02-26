import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-features',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './features.component.html',
	styleUrl: './features.component.scss',
})
export class FeaturesComponent {}
