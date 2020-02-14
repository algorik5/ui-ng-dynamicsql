import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./starter-home/starter-home.module').then(m => m.StarterHomeModule)
	}
	,{path: 'zhello',loadChildren: () => import('./zhello/zhello.module').then(m => m.ZhelloModule)}
	,{path: 'sqlview',loadChildren: () => import('./sqlview/sqlview.module').then(m => m.SqlviewModule)}
	,{path: 'stompui',loadChildren: () => import('./stompui/stompui.module').then(m => m.StompuiModule)}
	,{path: 'jsontree',loadChildren: () => import('./jsontree/jsontree.module').then(m => m.JsontreeModule)}
	,{path: 'timeseries',loadChildren: () => import('./timeseries/timeseries.module').then(m => m.TimeseriesModule)}

	,{path: 'sqlchart',loadChildren: () => import('./sqlchart/sqlchart.module').then(m => m.SqlchartModule)}

	,{path: 'stomptable',loadChildren: () => import('./stomptable/stomptable.module').then(m => m.StomptableModule)}
	,{path: 'stompchart',loadChildren: () => import('./stompchart/stompchart.module').then(m => m.StompchartModule)}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
