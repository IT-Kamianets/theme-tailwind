import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
	selector: 'app-public',
	imports: [FooterComponent, HeaderComponent, RouterOutlet],
	templateUrl: './public.component.html',
	styleUrl: './public.component.scss',
})
export class PublicComponent {}
