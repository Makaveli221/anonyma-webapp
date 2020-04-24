export const FRONT_ROUTES = [
	{
		path: 'accueil',
		data: {animation: 'accueil'},
		loadChildren: () => import('../modules/front/accueil/accueil.module').then((m) => m.AccueilModule)
	},
	{
		path: 'forums',
		data: {animation: 'forums'},
		loadChildren: () => import('../modules/front/forum/forum.module').then((m) => m.ForumModule)
	},
	{
		path: 'religions',
		data: {animation: 'religions'},
		loadChildren: () => import('../modules/front/religions/religions.module').then((m) => m.ReligionsModule)
	},
	{
		path: 'astuces',
		data: {animation: 'astuces'},
		loadChildren: () => import('../modules/front/astuces/astuces.module').then((m) => m.AstucesModule)
	},
	{
		path: 'coaching',
		data: {animation: 'coaching'},
		loadChildren: () => import('../modules/front/coaching/coaching.module').then((m) => m.CoachingModule)
	}
];