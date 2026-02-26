import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-use-cases',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './use-cases.component.html',
	styleUrl: './use-cases.component.scss',
})
export class UseCasesComponent {}
