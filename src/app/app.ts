import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from 'wacom';
import { Header } from './layouts/header/header';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Header],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	private _themeService = inject(ThemeService);

	constructor() {
		this._themeService.init();
	}
}
