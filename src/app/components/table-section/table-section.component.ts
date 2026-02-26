import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-table-section',
	imports: [],
	templateUrl: './table-section.component.html',
	styleUrl: './table-section.component.scss',
})
export class TableSectionComponent {}
