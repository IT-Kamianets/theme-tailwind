import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeDensity, ThemeMode, ThemeRadius, ThemeService } from 'wacom';

@Component({
	selector: 'app-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterLink],
	templateUrl: './footer.html',
	styleUrl: './footer.css',
})
export class Footer {
	protected readonly theme = inject(ThemeService);

	protected readonly modes: (ThemeMode | string)[] = ['light', 'dark', 'itkp'];
	protected readonly densities: ThemeDensity[] = ['comfortable', 'compact'];
	protected readonly radii: ThemeRadius[] = ['rounded', 'square'];

	protected readonly year = new Date().getFullYear();

	protected setMode(mode: ThemeMode | string) {
		this.theme.setMode(mode as ThemeMode);
	}

	protected setDensity(density: ThemeDensity) {
		this.theme.setDensity(density);
	}

	protected setRadius(radius: ThemeRadius) {
		this.theme.setRadius(radius);
	}
}
