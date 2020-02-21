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

  constructor() { this.test_data(); }

  //////////////////////////////// 사용법
  /*
    ///////// html
    <ibm-table [model]="getTableModel()" size="sm" showSelectionColumn="true" striped="true" sortable="true" enableSingleSelect="true" (selectRow)="tableSelectRow($event)"> </ibm-table>

    ///////// ts
    constructor(private table:TableService)
    getTableModel() { return this.table.getTableModel(); }
    // 입력
    this.table.clearTable();
    datas.forEach({...
      if(i==0) this.table.setColumn(mydata);
      this.table.addData(mydata);

    ///////// 주의
    ~constructor에서 사용하면 singleton이므로 모든 화면에서 데이터 공유됨
    ~2개의 TableService를 사용하고 싶으면 new TableService() 사용

  */

  private debug = true;
  private tableModel = new TableModel();
  getTableModel() { return this.tableModel; }//this.test_data(); }
  
  getDataLength() { return this.tableModel.data.length; }
  getData() 
  { 
    LogUtil.debug("=== table getData start #length="+this.tableModel.data.length);//+ Object.keys(data));
    let datas = [];
    let columns = this.getColumn();
    this.tableModel.data.forEach((o,i)=>{
      //LogUtil.debug("\t === data forEach #i="+i+"#o="+JSON.stringify(o));//[{"rowSpan":1,"colSpan":1,"data":"//id"},{"rowSpan":1,"colSpan":1,"data":"id"},{"rowSpan":1,"colSpan":1,"data":"string"},{"rowSpan":1,"colSpan":1,"data":"N"}]
      if(o == null || Object.keys(o).length < 1) return;//첫번째 row는 빈값이네 ...
      let values = o.map(o2=>o2["data"]);
      //LogUtil.debug("=== dataarray="+dataarray);
      let data = {}; columns.forEach((column,i)=>data[column]=values[i]);//{col1:v1,col2:v2...}
      datas.push(data);
    });
    LogUtil.debug("=== table getData end   #datas="+ JSON.stringify(datas));//+ Object.keys(data));
    return datas;//[{col1=x,col2=...}]
  }
  getSelectDataByEvent(selectEvent)
  {
    let row = selectEvent.selectedRowIndex;
    return this.getSelectData(row);
  }
  getSelectData(row)
  {
    //{col=v1,col2=...}
    //let columns = selectEvent.model['header'].map(o=>o['data']);
    //let values = selectEvent.model['_data'][row].map(o=>o['data']);
    let columns = this.getColumn();
    let values = this.tableModel.data[row].map(o=>o['data']);
    //LogUtil.debug("=== table getSelectData #values="+values);//+ Object.keys(data));
    let data = {}; columns.forEach((column,i)=>data[column] = values[i]);
    //LogUtil.debug("=== getSelectData #i="+row +"#data="+JSON.stringify(data));//{col=v1,col2=...}
    return data;
  }

  getColumn() {
    let columns = this.tableModel.header.map(o=>o["data"]);//{"visible":true,"sorted":false,"sortable":true,"filterCount":0,"rowSpan":1,"colSpan":1,"style":{},"_ascending":true,"data":"path","filterData":{"data":""}}
    //LogUtil.debug("=== table getColumn #columns="+columns);//+ Object.keys(data));
    return columns;//['a','b'...]
  }
  setColumn(data) //{id:1,name:'name1'}
  {
    LogUtil.debug("=== table setColumn start #data="+JSON.stringify(data));//+ Object.keys(data));
    this.tableModel.header = [];
    Object.keys(data).forEach(o => {
      this.tableModel.header.push(new TableHeaderItem({ data: o }));
    });
  }

  addData(data)//{id:1,name:'name1'}
  {
    LogUtil.debug("=== table addData start #data="+ JSON.stringify(data));
    let tablerow = []; ObjectUtil.values(data).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
    this.tableModel.data.push(tablerow);
    //LogUtil.debug("=== table addData end   #data="+ JSON.stringify(tablerow));
  }
  changeData(row,data)
  {
    LogUtil.debug("=== table changeData start #row="+row +"#data="+ JSON.stringify(data));
    let tablerow = []; ObjectUtil.values(data).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
    this.tableModel.data[row] = tablerow;
  }

  clearTable() 
  { 
    LogUtil.debug("=== table clearTable start # ");
    this.tableModel.header = [];
    this.tableModel.data = [];
  }

  // findData(path)
  // {
  //   let datas = this.getData();
  //   let searchs = JsonPathUtil.searchObjects(datas,path);
  //   LogUtil.debug("=== table findData #path="+ path +"#searchs="+searchs);
  //   return searchs;
  // }



  /////////////////////////////// test data
  test_data() {
    this.tableModel.header = [new TableHeaderItem({ data: 'id' }), new TableHeaderItem({ data: 'name' })];
    this.tableModel.data = [ 
      [new TableItem({ data: 'id-1' }), new TableItem({ data: 'Name 1' })], 
      [new TableItem({ data: 'id-3' }), new TableItem({ data: 'Name 2' })], 
      [new TableItem({ data: 'id-2' }), new TableItem({ data: 'Name 3' })] 
    ];
  }
}
