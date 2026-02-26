import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'app-profile-section',
	imports: [],
	templateUrl: './profile-section.component.html',
	styleUrl: './profile-section.component.scss',
})
export class ProfileSectionComponent {}
