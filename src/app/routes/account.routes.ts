export const ACCOUNT_ROUTES = [
	{
		path: 'user',
		data: {animation: 'user'},
		loadChildren: () => import('../modules/account/user/user.module').then((m) => m.UserModule)
	}
];