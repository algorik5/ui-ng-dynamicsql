import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlchartAboutComponent } from './sqlchart-about/sqlchart-about.component';


const routes: Routes = [
  { path: '',component: SqlchartAboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlchartRoutingModule { }
