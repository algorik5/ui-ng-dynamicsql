import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./starter-home/starter-home.module').then(m => m.StarterHomeModule)
	}
	,{path: 'zhello',loadChildren: () => import('./zhello/zhello.module').then(m => m.ZhelloModule)}
	,{path: 'sqlview',loadChildren: () => import('./sqlview/sqlview.module').then(m => m.SqlviewModule)}

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
