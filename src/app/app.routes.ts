import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { List } from './pages/list/list';

export const routes: Routes = [
	{
		path: '',
		component: Home,
	},
	{
		path: 'list',
		component: List,
	},
];
