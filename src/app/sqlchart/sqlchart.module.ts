import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SqlchartRoutingModule } from './sqlchart-routing.module';
import { SqlchartAboutComponent } from './sqlchart-about/sqlchart-about.component';
import { TagModule, CodeSnippetModule, TabsModule, InputModule, SearchModule, ButtonModule, TableModule, GridModule, StructuredListModule } from 'carbon-components-angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotTableModule } from '@handsontable/angular';
import { TreeTableModule } from 'primeng/treetable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [SqlchartAboutComponent],
  imports: [
    CommonModule,
    TagModule,
    CodeSnippetModule,
    TabsModule,
    InputModule,
    SearchModule,
    ButtonModule,
    TableModule,
    GridModule,
    StructuredListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScrollingModule,
    NgxJsonViewerModule,
    HotTableModule,
    TreeTableModule,
    NgxEchartsModule,
    SqlchartRoutingModule
  ]
})
export class SqlchartModule { }
