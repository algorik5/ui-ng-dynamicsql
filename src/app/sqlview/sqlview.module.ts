import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { SqlviewRoutingModule } from './sqlview-routing.module';
import { SqlviewAboutComponent } from './sqlview-about/sqlview-about.component';
import { InputModule, ButtonModule, TagModule, TableModule, SearchModule } from 'carbon-components-angular';


@NgModule({
  declarations: [SqlviewAboutComponent],
  imports: [
    CommonModule,
    InputModule,
    ButtonModule,
    TagModule,
    TableModule,
    SearchModule,
    HttpClientModule,
    SqlviewRoutingModule
  ]
})
export class SqlviewModule { }
