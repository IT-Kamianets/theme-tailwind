import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-form-section',
	imports: [],
	templateUrl: './form-section.component.html',
	styleUrl: './form-section.component.scss',
})
export class FormSectionComponent {}
