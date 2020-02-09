import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompchartRoutingModule } from './stompchart-routing.module';
import { StompchartAboutComponent } from './stompchart-about/stompchart-about.component';


@NgModule({
  declarations: [StompchartAboutComponent],
  imports: [
    CommonModule,
    StompchartRoutingModule
  ]
})
export class StompchartModule { }
