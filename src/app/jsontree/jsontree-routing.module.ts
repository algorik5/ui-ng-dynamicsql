import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JsontreeAboutComponent } from './jsontree-about/jsontree-about.component';


const routes: Routes = [
  { path: '',component: JsontreeAboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsontreeRoutingModule { }
