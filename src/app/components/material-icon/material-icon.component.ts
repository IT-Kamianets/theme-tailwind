import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CoreService } from 'wacom';

@Component({
	selector: 'material-icon',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialIconComponent {
	private readonly _coreService = inject(CoreService);

	/** Material Symbols glyph name, e.g. "home" */
	icon = input<string>('');

	/** Optional label next to the icon */
	text = input<string>('');

	/** Show label on mobile */
	showTextOnMobile = input<boolean>(false);

	/** Show label on tablet */
	showTextOnTablet = input<boolean>(false);

	/** Show label on desktop/web */
	showTextOnWeb = input<boolean>(false);

	ariaLabel = computed(() => this.text().trim() || this.icon().trim() || 'icon');
	hasText = computed(() => !!this.text().trim());

	showText = computed(() => {
		if (!this.hasText()) return false;

		if (this._coreService.isViewportMobile()) return this.showTextOnMobile();
		if (this._coreService.isViewportTablet()) return this.showTextOnTablet();
		return this.showTextOnWeb(); // desktop
	});
}
