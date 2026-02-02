import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { List } from './pages/list/list';
import { Profile } from './pages/profile/profile';
import { Form } from './pages/form/form';
import { Table } from './pages/table/table';
import { Gallery } from './pages/gallery/gallery';
import { Content } from './pages/content/content';

export const routes: Routes = [
	{
		path: '',
		component: Home,
	},
	{
		path: 'list',
		component: List,
	},
	{
		path: 'profile',
		component: Profile,
	},
	{
		path: 'form',
		component: Form,
	},
	{
		path: 'table',
		component: Table,
	},
	{
		path: 'gallery',
		component: Gallery,
	},
	{
		path: 'content',
		component: Content,
	},
];
