import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StompuiRoutingModule } from './stompui-routing.module';
import { StompuiAboutComponent } from './stompui-about/stompui-about.component';
import { InputModule, SearchModule, ButtonModule, TagModule, TableModule, GridModule } from 'carbon-components-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [StompuiAboutComponent],
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
    StompuiRoutingModule
  ]
})
export class StompuiModule { }
