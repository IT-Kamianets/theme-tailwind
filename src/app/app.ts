import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './layouts/header/header';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, Header],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit {
	protected readonly title = signal('theme-tailwind');

	constructor(private router: Router) {}

	ngOnInit() {
		// Always redirect to home on app load
		this.router.navigate(['/']);
	}
}
