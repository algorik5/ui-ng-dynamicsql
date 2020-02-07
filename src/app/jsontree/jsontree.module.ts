import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsontreeRoutingModule } from './jsontree-routing.module';
import { JsontreeAboutComponent } from './jsontree-about/jsontree-about.component';


@NgModule({
  declarations: [JsontreeAboutComponent],
  imports: [
    CommonModule,
    JsontreeRoutingModule
  ]
})
export class JsontreeModule { }
