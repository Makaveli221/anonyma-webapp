import { Roles } from '@schema/roles';

export const ACCOUNT_ROUTES = [
	{
		path: 'user',
		data: { roles: [Roles.ROLE_ADMIN, Roles.ROLE_MODERATOR, Roles.ROLE_USER], animation: 'user'},
		loadChildren: () => import('../modules/account/user/user.module').then((m) => m.UserModule)
	},
	{
		path: 'admin',
		data: { roles: [Roles.ROLE_ADMIN], animation: 'admin'},
		loadChildren: () => import('../modules/account/admin/admin.module').then((m) => m.AdminModule)
	}
];