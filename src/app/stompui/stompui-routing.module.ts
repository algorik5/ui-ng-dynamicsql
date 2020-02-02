import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StompuiAboutComponent } from './stompui-about/stompui-about.component';


const routes: Routes = [
  { path: '',component: StompuiAboutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StompuiRoutingModule { }
