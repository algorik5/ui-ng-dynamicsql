import { Injectable } from '@angular/core';
import Handsontable from 'handsontable';
import { LogUtil } from '../util/LogUtil';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import { ObjectUtil } from '../util/ObjectUtil';
import { JsonPathUtil } from '../util/JsonPathUtil';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  //////////////////////////////// 사용법
  /*
    ///////// html
    <ibm-table [model]="getTableModel()" size="sm" showSelectionColumn="true" striped="true" sortable="true" enableSingleSelect="true" (selectRow)="tableSelectRow($event)"> </ibm-table>

    ///////// ts
    getTableModel() { return this.table.getTableModel(); }
    ...
    this.table.clearTable();
    datas.forEach({...
      if(i==0) this.table.setColumn(mydata);
      this.table.addData(mydata);
  */

  private tableModel = new TableModel();
  getTableModel() { return this.tableModel; }//this.test_data(); }
  getDataLength() { return this.tableModel.data.length; }
  //getData() { return this.tableModel.data; }
  //setData(datas) { this.tableModel.data = datas; }
  getData() 
  { 
    LogUtil.debug("=== table getData start #length="+this.tableModel.data.length);//+ Object.keys(data));
    let datas = [];
    let headers = this.tableModel.header.map(o=>o["data"]);//{"visible":true,"sorted":false,"sortable":true,"filterCount":0,"rowSpan":1,"colSpan":1,"style":{},"_ascending":true,"data":"path","filterData":{"data":""}}
    //LogUtil.debug("=== headers="+headers);
    this.tableModel.data.forEach((o,i)=>{
      //LogUtil.debug("\t === data forEach #i="+i+"#o="+JSON.stringify(o));//[{"rowSpan":1,"colSpan":1,"data":"//id"},{"rowSpan":1,"colSpan":1,"data":"id"},{"rowSpan":1,"colSpan":1,"data":"string"},{"rowSpan":1,"colSpan":1,"data":"N"}]
      if(o == null || Object.keys(o).length < 1) return;//첫번째 row는 빈값이네 ...
      let dataarray = o.map(o2=>o2["data"]);
      //LogUtil.debug("=== dataarray="+dataarray);
      let data = {}; headers.forEach((o,i)=>data[o]=dataarray[i]);//{col1:v1,col2:v2...}
      datas.push(data);
    });
    LogUtil.debug("=== table getData end   #datas="+ JSON.stringify(datas));//+ Object.keys(data));
    return datas;//[{col1=x,col2=...}]
  }

  getColumn() {
    let headers = this.tableModel.header.map(o=>o["data"]);//{"visible":true,"sorted":false,"sortable":true,"filterCount":0,"rowSpan":1,"colSpan":1,"style":{},"_ascending":true,"data":"path","filterData":{"data":""}}
    return headers;//['a','b'...]
  }
  setColumn(data) //{id:1,name:'name1'}
  {
    LogUtil.debug("=== table setColumn start #columns="+data);//+ Object.keys(data));
    this.tableModel.header = [];
    Object.keys(data).forEach(o => {
      this.tableModel.header.push(new TableHeaderItem({ data: o }));
    });
  }
  addData(data)//{id:1,name:'name1'}
  {
    LogUtil.debug("=== table addData start #data="+ JSON.stringify(data));
    let tablerow = [];
    ObjectUtil.values(data).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
    this.tableModel.data.push(tablerow);
  }

  clearTable() 
  { 
    LogUtil.debug("=== table clearTable start # ");
    this.tableModel.header = [];
    this.tableModel.data = [];
  }

  findData(path)
  {
    let datas = this.getData();
    let searchs = JsonPathUtil.searchObjects(datas,path);
    LogUtil.debug("=== table findData #path="+ path +"#searchs="+searchs);
    return searchs;
  }



  /////////////////////////////// test data
  test_data() {
    this.tableModel.header = [new TableHeaderItem({ data: 'id' }), new TableHeaderItem({ data: 'name' })];
    this.tableModel.data = [ [new TableItem({ data: 'id-1' }), new TableItem({ data: 'Name 1' })], [new TableItem({ data: 'id-3' }), new TableItem({ data: 'Name 2' })], [new TableItem({ data: 'id-2' }), new TableItem({ data: 'Name 3' })] ];
  }
}
