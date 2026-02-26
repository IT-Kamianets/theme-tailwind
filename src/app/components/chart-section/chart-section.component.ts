import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-chart-section',
	imports: [],
	templateUrl: './chart-section.component.html',
	styleUrl: './chart-section.component.scss',
})
export class ChartSectionComponent {}
