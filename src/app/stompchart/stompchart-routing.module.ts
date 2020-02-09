import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StompchartAboutComponent } from './stompchart-about/stompchart-about.component';


const routes: Routes = [
  { path: '',component: StompchartAboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StompchartRoutingModule { }
