import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { SqlviewRoutingModule } from './sqlview-routing.module';
import { SqlviewAboutComponent } from './sqlview-about/sqlview-about.component';
import { InputModule, ButtonModule, TagModule, TableModule, SearchModule, GridModule } from 'carbon-components-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SqlviewAboutComponent],
  imports: [
    CommonModule,
    InputModule,
    SearchModule,
    ButtonModule,
    TagModule,
    TableModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SqlviewRoutingModule
  ]
})
export class SqlviewModule { }
