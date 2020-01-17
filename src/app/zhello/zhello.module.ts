import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZhelloRoutingModule } from './zhello-routing.module';
import { ZhelloAboutComponent } from './zhello-about/zhello-about.component';


@NgModule({
  declarations: [ZhelloAboutComponent],
  imports: [
    CommonModule,
    ZhelloRoutingModule
  ]
})
export class ZhelloModule { }
