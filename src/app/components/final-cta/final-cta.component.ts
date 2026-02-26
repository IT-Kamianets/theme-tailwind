import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-final-cta',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	templateUrl: './final-cta.component.html',
	styleUrl: './final-cta.component.scss',
})
export class FinalCtaComponent {}
