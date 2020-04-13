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
		path: 'thematique',
		data: {animation: 'thematique'},
		loadChildren: () => import('../modules/front/topic/topic.module').then((m) => m.TopicModule)
	},
	{
		path: 'knowledges',
		data: {animation: 'knowledges'},
		loadChildren: () => import('../modules/front/knowledge/knowledge.module').then((m) => m.KnowledgeModule)
	},
	{
		path: 'coaching',
		data: {animation: 'coaching'},
		loadChildren: () => import('../modules/front/coaching/coaching.module').then((m) => m.CoachingModule)
	}
];