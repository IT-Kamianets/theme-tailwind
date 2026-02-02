import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { List } from './pages/list/list';
import { ListDev1 } from './pages/list-dev1/list-dev1';
import { ProfileDev1 } from './pages/profile-dev1/profile-dev1';
import { FormDev2 } from './pages/form-dev2/form-dev2';
import { TableDev2 } from './pages/table-dev2/table-dev2';
import { GalleryDev3 } from './pages/gallery-dev3/gallery-dev3';
import { ContentDev3 } from './pages/content-dev3/content-dev3';

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
		path: 'dev1/list',
		component: ListDev1,
	},
	{
		path: 'dev1/profile',
		component: ProfileDev1,
	},
	{
		path: 'dev2/form',
		component: FormDev2,
	},
	{
		path: 'dev2/table',
		component: TableDev2,
	},
	{
		path: 'dev3/gallery',
		component: GalleryDev3,
	},
	{
		path: 'dev3/content',
		component: ContentDev3,
	},
];
