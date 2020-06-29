import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/forums/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent
  },
	{
		path: 'thematique',
		data: {animation: 'thematique', name: 'forums'},
		loadChildren: () => import('../topic/topic.module').then((m) => m.TopicModule)
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
