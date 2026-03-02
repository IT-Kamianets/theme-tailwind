import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideTranslation, Translation } from 'wacom';
import { routes } from './app.routes';
import { translates } from './app.translates';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideClientHydration(withEventReplay()),
		provideTranslation(
			(() => {
				const translations: Translation[] = [];

				for (const sourceText in translates) {
					if (translates[sourceText]['ua'])
						[translations.push({ sourceText, text: translates[sourceText]['ua'] })];
				}

				return translations;
			})(),
		),
	],
};
