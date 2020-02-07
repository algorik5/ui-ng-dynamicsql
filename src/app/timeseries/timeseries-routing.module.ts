import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeseriesAboutComponent } from './timeseries-about/timeseries-about.component';


const routes: Routes = [
  { path: '',component: TimeseriesAboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeseriesRoutingModule { }
