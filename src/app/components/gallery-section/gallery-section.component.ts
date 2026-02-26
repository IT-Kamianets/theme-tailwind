import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-gallery-section',
	imports: [],
	templateUrl: './gallery-section.component.html',
	styleUrl: './gallery-section.component.scss',
})
export class GallerySectionComponent {}
