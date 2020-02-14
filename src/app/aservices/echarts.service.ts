import { Injectable } from '@angular/core';
import { EChartOption, ECharts } from 'echarts';
import { DateUtil } from '../util/DateUtil';
import { NumberUtil } from '../util/NumberUtil';
import { StringUtil } from '../util/StringUtil';
import { MathUtil } from '../util/MathUtil';

@Injectable({
  providedIn: 'root'
})
export class EchartsService {

  constructor() { }
    /////////////////////////// 사용법
    /*  
      ///////1 html
      <div echarts [options]="chartoptions" (chartInit)="chartinit($event)"></div>
      ///////2 ts
      chartoptions:EChartOption = {};//주의 - null로 선언되면 chartinit 호출안됨
      chartinit(event) { this.chart.setChartInstance(event); this.chartoptions = this.chart.getChartOption(); }
      chartclear() { this.chart.clearChart(); }
      chartadddatatest() { this.chart.test_adddata(); }
  */


  /////////////////////////// ngx-charts
  getChartOption() { return this.chartoptions; }
  chartoptions:EChartOption = {
    //title: { text: 'test chart' },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'time' },
    yAxis: { type: 'value',},// boundaryGap: [0, '100%'], },
    legend: { data:[] },
    series: [],//[{ name: 'Mocking Data', type: 'line', data: this.data }]
  };

  chartinstance: ECharts;
  setChartInstance(instance) { 
    console.log("===setChartInstance start #instance="+instance);// +":"+ arguments.callee.toString());
    this.chartinstance = instance;
  }

  clearChart()
  {
    this.chartoptions.legend.data = [];
    this.chartoptions.series = [];
    this.chartinstance.clear();
  }

  maxrow = 10;
  addData(data)//{legend:host,x:date,y:value}
  {
    let legend = data["legend"];
    let x = data["x"];
    let y = data["y"];
  }
  addDataRow(legend,x,y)
  {
    console.log("===addDataRow start #legend="+legend +"#x="+x +"#y="+y);
    let series = this.chartoptions.series.find(o=>o["name"]==legend);
    if(series == null)
    {
      this.chartoptions.legend.data.push(legend);
      let nextindex = this.chartoptions.series.push({type:"line",name:legend,data:[]});
      series = this.chartoptions.series[nextindex-1];
    }
    if(series["data"].length > this.maxrow) series["data"].shift();
    series["data"].push([x,y]);
    this.chartinstance.setOption(this.chartoptions);
  }

  ////////////////////////////// test data
  no=0;
  test_adddata()
  {
    this.no++;
    let date = new Date();
    let newdate = DateUtil.addDays(date,this.no);

    ["host-1","host-2"].forEach(host=>{
      let temp = NumberUtil.stringToNumber(StringUtil.substringAfter(host,"-"));
      let value = temp * MathUtil.random(0,10);
      //this.addData({legend:host,x:newdate,y:value*2});
      this.addDataRow(host,newdate,value*2);
    })
  }
}
