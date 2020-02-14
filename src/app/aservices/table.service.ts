import { Injectable } from '@angular/core';
import Handsontable from 'handsontable';
import { LogUtil } from '../util/LogUtil';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor() { }

  //////////////////////////////// 사용법
  /*
    ///////// html
    <hot-table [hotId]="getTableId()" [settings]="getTableConfig()" [data]="getTableData()" licenseKey="non-commercial-and-evaluation"></hot-table>

    ///////// ts
  getTableId() { return this.table.getId(); }
  getTableConfig() { return this.table.getConfig(); }
  getTableData() { return this.table.getData(); }
  refreshTable() { this.table.refreshTable(); }
  ...
  this.table.clearData();
  forEach... this.table.addData(mydata);
  this.table.addColumn();
  */

  //////////////////////////////// hansometable
  hotId = "id-1";
  hotDatas = [];//[{id:1,name:'name1'},{id:2,name:'name2'}];
  hotSettings:Handsontable.GridSettings = 
  { 
    //data:this.hotDatas,
    rowHeaders:true,//(or [a,b,c]
    stretchH:"all"
  };

  getId() { return this.hotId; }
  getData() { return this.hotDatas; }
  getConfig() { return this.hotSettings; }

  clearData() 
  { 
    LogUtil.debug("=== table clearData start #length="+ this.hotDatas.length);
    this.hotDatas = []; 
    //LogUtil.debug("=== table clearData end #length="+ this.hotDatas.length);
  }
  refreshTable() //주의 - clear한 후 add하면 화면에 값표시가 안됨 - 다른 이벤트에서 add를 한번더해야 값 표시됨
  {
    LogUtil.debug("=== table refreshTable length="+ this.hotDatas.length);
    if(this.hotDatas.length > 0)
     {
       let empty = {};
       let last = this.hotDatas[this.hotDatas.length - 1];
       //let lastv = last[Object.keys(last)[0]];
       //if(lastv==null || lastv.length < 1) return;//헐 add가 안되면 화면 표시 안됨
       Object.keys(last).forEach(o=>{ empty[o] = "" });
       this.addData(empty);
     }
  }
  addColumn() 
  {
    LogUtil.debug("=== table addColumn start #length="+ this.hotDatas.length);
    if(this.hotDatas.length < 1) return;
    let columns = {}; Object.keys(this.hotDatas[0]).forEach(k=>{ columns[k] = k; });
    this.hotDatas = [columns].concat(this.hotDatas);
    //this.hotDatas.push(columns);
    //LogUtil.debug("=== table addColumn end #data="+ JSON.stringify(data));
  }//{id:1,name:'name1'}
  addData(data)//{id:1,name:'name1'}
  {
    LogUtil.debug("=== table addData start #data="+ JSON.stringify(data));
    //this.hotDatas.push(data);//push는 안됨
    this.hotDatas = this.hotDatas.concat(data);

    //LogUtil.debug("=== table addData end #data="+ JSON.stringify(data));
  }



  //////////////////////////////// test data
  test_adddata() { 
    this.hotDatas = [{id:1,name:'name1'},{id:2,name:'name2'}];  
  }
  no = 0;
  test_adddata2() { 
    this.no++;
    let data = {id:this.no,name:'name-'+this.no};
    this.hotDatas = this.hotDatas.concat(data);
    LogUtil.debug("=== test_adddata2="+ JSON.stringify(this.hotDatas));
  }

  clickChangeData(evnet) { 
    //this.hotDatas = [{idz:1,namez:'name111',desc:'desc111'},{idz:2,namez:'name222',desc:'desc222'},{idz:3,namez:'name333',desc:'desc333'}]; 
    let datas = [{id:1,name:'name111',desc:'desc111'},{id:2,name:'name222',desc:'desc222'},{id:3,name:'name333',desc:'desc333'}]; 
    let columns = {}; Object.keys(datas[0]).forEach(k=>{ columns[k] = k; });
    //this.hotDatas = [columns].concat(datas);
  }
    
}
