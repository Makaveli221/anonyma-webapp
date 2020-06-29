import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { SingleComponent } from './pages/single/single.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/astuces/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
	{
		path: 'thematique',
		data: {animation: 'thematique', name: 'astuces'},
		loadChildren: () => import('../topic/topic.module').then((m) => m.TopicModule)
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstucesRoutingModule { }
