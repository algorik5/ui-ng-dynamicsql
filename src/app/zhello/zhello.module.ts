import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZhelloRoutingModule } from './zhello-routing.module';
import { ZhelloAboutComponent } from './zhello-about/zhello-about.component';
import { TagModule, CodeSnippetModule, TabsModule } from 'carbon-components-angular';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { HotTableModule } from '@handsontable/angular';
import {TreeTableModule} from 'primeng/treetable';

@NgModule({
  declarations: [ZhelloAboutComponent],
  imports: [
    CommonModule,
    TagModule,
    CodeSnippetModule,
    TabsModule,
    NgxJsonViewerModule,
    HotTableModule,
    TreeTableModule,
    ZhelloRoutingModule
  ]
})
export class ZhelloModule { }
