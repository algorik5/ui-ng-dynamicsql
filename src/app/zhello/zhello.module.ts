import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZhelloRoutingModule } from './zhello-routing.module';
import { ZhelloAboutComponent } from './zhello-about/zhello-about.component';
import { TagModule, CodeSnippetModule, TabsModule, ButtonModule } from 'carbon-components-angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotTableModule } from '@handsontable/angular';
import {TreeTableModule} from 'primeng/treetable';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [ZhelloAboutComponent],
  imports: [
    CommonModule,
    TagModule,
    ButtonModule,
    CodeSnippetModule,
    TabsModule,
    NgxJsonViewerModule,
    HotTableModule,
    TreeTableModule,
    FlexLayoutModule,
    NgxEchartsModule,
    ZhelloRoutingModule
  ]
})
export class ZhelloModule { }
