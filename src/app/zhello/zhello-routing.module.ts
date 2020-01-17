import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZhelloAboutComponent } from './zhello-about/zhello-about.component';


const routes: Routes = [
  { path: '',component: ZhelloAboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZhelloRoutingModule { }
