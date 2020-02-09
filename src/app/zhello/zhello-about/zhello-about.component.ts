import { Component, OnInit } from '@angular/core';
import { LogUtil } from 'src/app/util/LogUtil';
import Handsontable from 'handsontable';

declare var defiant;
declare var alasql;

@Component({
  selector: 'app-zhello-about',
  templateUrl: './zhello-about.component.html',
  styleUrls: ['./zhello-about.component.scss']
})
export class ZhelloAboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initHotDatas();
    this.inittreetabledata();
  }



  //////////////////////////////// ngx-json-viewer
  jsonObject = {"root":[{ "data":{ "name":"file1", "size":"75kb" } },{ "data":{ "name":"file2", "size":"99kb" } }]};

  //////////////////////////////// defiant
  paths = ["//root","//name","//data/size","//root[1]/data/size"];
  searchObject = [];
  clickPath(path)
  {
    this.searchObject = defiant.search(this.jsonObject,path);//없으면 [] 리턴(무조건 array리턴)
  }

  //////////////////////////////// hansometable
  hotId = "id-1";
  hotSettings:Handsontable.GridSettings = { 
    //data:this.hotDatas,
    rowHeaders:true,//(or [a,b,c]
    stretchH:"all"
  };
  hotDatas = [];//[{id:1,name:'name1'},{id:2,name:'name2'}];
  initHotDatas() { this.hotDatas = [{id:1,name:'name1'},{id:2,name:'name2'}];  }
  clickChangeData(evnet) { 
    //this.hotDatas = [{idz:1,namez:'name111',desc:'desc111'},{idz:2,namez:'name222',desc:'desc222'},{idz:3,namez:'name333',desc:'desc333'}]; 
    let datas = [{id:1,name:'name111',desc:'desc111'},{id:2,name:'name222',desc:'desc222'},{id:3,name:'name333',desc:'desc333'}]; 
    let columns = {}; Object.keys(datas[0]).forEach(k=>{ columns[k] = k; });
    this.hotDatas = [columns].concat(datas);
  }

  //////////////////////////////// alasql
  db;
  rs;
  clickDBCreate(event)
  {
    LogUtil.debug("clickDBCreate start ");
    this.db = new alasql.Database();
    LogUtil.debug("clickDBCreate end #db="+this.db);
  }
  clickDBCreateTable(event) {
    LogUtil.debug("clickDBCreateTable start ");
    this.rs = this.db.exec("create table test1 (id int primary key,name string )");//==alasql(create ...)
    LogUtil.debug("clickDBCreateTable end #rs="+this.rs);
  }
  clickDBInsert(event) {
    LogUtil.debug("clickDBInsert start ");
    let count = 0;
    [1,2,3].forEach(k=>{
      this.rs = this.db.exec("insert into test1 values ("+k+",'data-"+k+"')");
      LogUtil.debug("\t - exec #rs="+this.rs);
      count = count + this.rs;
    });
    LogUtil.debug("clickDBInsert end #count="+count);

  }
  clickDBInsert_pstmt(event) {
    //실패 - 향후
    // //let pstmt = this.db.compile("insert into test1 values (:id,:name)");
    // //let pstmt = this.db.compile("insert into test1 values (?,?)");
    // alasql("create table test1 (id int primary key,name string )");
    // let pstmt = alasql.compile("insert into test1 values (?,?)");
    // [11,12,13].forEach(k=>{
    //   pstmt(k,"data-"+k);
    //   //pstmt([k,"data-"+k]);
    //   //pstmt({id:k,name:"data-"+k});
    //   LogUtil.debug("\t - pstmt #rs="+this.rs);
    // });
    // LogUtil.debug("clickDBInsert end ");
  }
  clickDBSelect(event) {
    LogUtil.debug("clickDBSelect start ");
    this.rs = this.db.exec("select * from test1 order by id");//==alasql(create ...)
    this.hotDatas = this.rs;
    LogUtil.debug("clickDBSelect end #rs="+this.rs);
  }
  hotId1 = "id-2";
  hotSettings1:Handsontable.GridSettings = {  rowHeaders:true, stretchH:"all" };
  hotDatas1 = [];//[{id:1,name:'name1'},{id:2,name:'name2'}];
  clickDBSelectToHansometable(event) {
    LogUtil.debug("clickDBSelectToHansometable start ");
    let rs1 = this.db.exec("select * from test1 order by id");//==alasql(create ...)
    let columns = {}; Object.keys(rs1[0]).forEach(k=>{ columns[k] = k; });
    this.hotDatas1 = [columns].concat(rs1);
    LogUtil.debug("clickDBSelectToHansometable end #rs="+this.rs);
  }



  /////////////////////////// treetable/primeng
  treetablecolumns = [];
  treetabledata = [];
  inittreetabledata(){
    this.treetabledata = [ 
      { "data":{ "name":"Documents", "size":"75kb", "type":"Folder" },"children":[{ "data":{ "name":"Work", "size":"55kb", "type":"Folder" }, "children":[{ "data":{ "name":"Expenses.doc", "size":"30kb", "type":"Document" } }, { "data":{ "name":"Resume.doc", "size":"25kb", "type":"Resume" } }]}, 
      { "data":{ "name":"Home", "size":"20kb", "type":"Folder" },"children":[ { "data":{ "name":"Invoices", "size":"20kb", "type":"Text" } } ] } ] }, 
      { "data":{ "name":"Pictures", "size":"150kb", "type":"Folder" },"children":[ { "data":{ "name":"barcelona.jpg", "size":"90kb", "type":"Picture" } }, { "data":{ "name":"primeui.png", "size":"30kb", "type":"Picture" } }, { "data":{ "name":"optimus.jpg", "size":"30kb", "type":"Picture" } } ] } 
    ];
    this.treetablecolumns = Object.keys(this.treetabledata[0]["data"]);
  }

  /////////////////////////// testdata
  testdata = {
    "string": "simple value",
    "number": 1234567,
    "array": [ "value1", 22222, "value3" ],
    "null": null,
    "object":{ "col1":"c1","col2":"c2" },
    "objectarray":[{ "col1":"c1","col2":"c2" },{ "col1":"c11","col2":"c22" }],
    "nested": {
      "string": "simple value0",
      "number": 12345670,
      "array": [ "value10", 222220, "value30" ],
      "null": null,
      "object":{ "col10":"c10","col20":"c20" },
      "objectarray":[{ "col1":"c1","col2":"c2" },{ "col1":"c11","col2":"c22" }]
    }
  };
}
