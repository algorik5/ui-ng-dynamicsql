import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompinsertRoutingModule } from './stompinsert-routing.module';
import { AboutComponent } from './about/about.component';
import { TagModule, CodeSnippetModule, TabsModule, InputModule, SearchModule, ButtonModule, TableModule, GridModule, StructuredListModule } from 'carbon-components-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotTableModule } from '@handsontable/angular';
import { TreeTableModule } from 'primeng/treetable';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    TagModule, CodeSnippetModule, TabsModule, InputModule, SearchModule, ButtonModule, TableModule, GridModule, StructuredListModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,ScrollingModule,
    NgxJsonViewerModule, HotTableModule, TreeTableModule, NgxEchartsModule,
    StompinsertRoutingModule
  ]
})
export class StompinsertModule { }
