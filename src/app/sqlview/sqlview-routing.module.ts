import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SqlviewAboutComponent } from './sqlview-about/sqlview-about.component';


const routes: Routes = [
  { path: '',component: SqlviewAboutComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SqlviewRoutingModule { }
