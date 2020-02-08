import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeseriesRoutingModule } from './timeseries-routing.module';
import { TimeseriesAboutComponent } from './timeseries-about/timeseries-about.component';
import { TagModule, CodeSnippetModule, TabsModule, InputModule, SearchModule, ButtonModule, TableModule, GridModule, StructuredListModule } from 'carbon-components-angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotTableModule } from '@handsontable/angular';
import { TreeTableModule } from 'primeng/treetable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
//import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [TimeseriesAboutComponent],
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
    NgxJsonViewerModule,
    HotTableModule,
    TreeTableModule,
    NgScrollbarModule,
    //ScrollingModule,
    TimeseriesRoutingModule
  ]
})
export class TimeseriesModule { }
