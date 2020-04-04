import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { PageLoginComponent } from './layout/page-login/page-login.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: 'accueil',
        data: {animation: 'accueil'},
        loadChildren: () => import('./modules/front/accueil/accueil.module').then((m) => m.AccueilModule)
      },
      {
        path: 'forums',
        data: {animation: 'forums'},
        loadChildren: () => import('./modules/forum/forum.module').then((m) => m.ForumModule)
      },
      {
        path: 'thematique',
        data: {animation: 'thematique'},
        loadChildren: () => import('./modules/topic/topic.module').then((m) => m.TopicModule)
      },
      {
        path: 'knowledges',
        data: {animation: 'knowledges'},
        loadChildren: () => import('./modules/knowledge/knowledge.module').then((m) => m.KnowledgeModule)
      },
      {
        path: 'coaching',
        data: {animation: 'coaching'},
        loadChildren: () => import('./modules/coaching/coaching.module').then((m) => m.CoachingModule)
      }
    ]
  },
  {
    path: 'login', component: PageLoginComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
