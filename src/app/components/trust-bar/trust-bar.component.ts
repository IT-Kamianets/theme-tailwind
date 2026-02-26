import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-trust-bar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './trust-bar.component.html',
	styleUrl: './trust-bar.component.scss',
})
export class TrustBarComponent {}
