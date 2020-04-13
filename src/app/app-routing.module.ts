import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NoAuthGuard } from '@app/guard/no-auth.guard';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { ContentAuthComponent } from './layout/content-auth/content-auth.component';
import { PageAccessDeniedComponent } from './layout/page-access-denied/page-access-denied.component';
import { FRONT_ROUTES } from './routes/front.routes';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [NoAuthGuard],
    children: FRONT_ROUTES
  },
  {
    path: '',
    component: ContentAuthComponent,
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  { path: 'access-denied', component: PageAccessDeniedComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
