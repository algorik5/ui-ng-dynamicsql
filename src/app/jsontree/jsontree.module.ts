import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsontreeRoutingModule } from './jsontree-routing.module';
import { JsontreeAboutComponent } from './jsontree-about/jsontree-about.component';
import { InputModule, SearchModule, ButtonModule, TagModule, TableModule, GridModule, StructuredListModule, CodeSnippetModule, TabsModule } from 'carbon-components-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotTableModule } from '@handsontable/angular';
import { TreeTableModule } from 'primeng/treetable';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [JsontreeAboutComponent],
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
    JsontreeRoutingModule
  ]
})
export class JsontreeModule { }
