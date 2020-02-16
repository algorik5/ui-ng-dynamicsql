import { Component, OnInit } from '@angular/core';
import { LogUtil } from 'src/app/util/LogUtil';
import { StompService } from 'src/app/aservices/stomp.service';
import { LogService } from 'src/app/aservices/log.service';
import { DateUtil } from 'src/app/util/DateUtil';
import { TreeNode } from 'primeng/api';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import Handsontable from 'handsontable';
import { TableService } from 'src/app/aservices/table.service';
import { StringUtil } from 'src/app/util/StringUtil';
import { DblocalService } from 'src/app/aservices/dblocal.service';
import { JsonPathUtil } from 'src/app/util/JsonPathUtil';

declare var Flatted;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private log:LogService,private stomp:StompService
    ,private table:TableService,private dblocal:DblocalService) { 
  }

  ngOnInit() {
    this.mapinit();
    this.inittreetabledata();
  }

  ////////////////////////////////////////////////////////// connect 
  wsurl = "ws://localhost:18080/websocket";
  clickConnect() { this.stomp.connect(this.wsurl); }
  clickDisconnect() { this.stomp.disconnect(); }
  isConnected()  {  return this.stomp.isConnected();  }

  tagColor(name) { if(name.includes("ERR")) return "red"; if(name.includes("ver")) return "red"; if(name.includes("xxx")) return "green"; return "blue"; }

  /////////////////////////// editor
  editordata = "";
  editordatavalid = "";
  editorrows = 10;
  setEditordata(json) { this.editordata = JSON.stringify(json,null,2); }
  editorToTree()
  {
    let json = JSON.parse(this.editordata);
    this.jsonToTree(json);
    this.editordatavalid = "valid";
  }


  /////////////////////////// table
  getTableModel() { return this.table.getTableModel(); }

  /////////////////////////// table 2
  sql_table = new TableService();
  sql_getTableModel() { return this.sql_table.getTableModel(); }
  
  tableSelectRow(event)
  {
    let data = this.table.getSelectDataByEvent(event);
    data["pk"] = data["pk"]=="N" ? "Y":"N";
    LogUtil.debug("--- tableSelectRow #data="+ JSON.stringify(data));//+ Object.keys(data));
    this.table.changeData(event.selectedRowIndex,data);
  }


  /////////////////////////// treetable/primeng
  treetablecolumns = [];
  treetabledata = [];
  inittreetabledata(){
    this.treetabledata = 
    [ 
      { "data":{ "name":"Documents", "value":"75kb", "type":"Folder","path":"//Documents" }
        ,"children":
        [
          { "data":{ "name":"Work", "value":"55kb", "type":"Folder","path":"//Documents/Work" }
          ,"children":[{ "data":{ "name":"Expenses.doc", "value":"30kb", "type":"Document","path":"//Documents/Work/Expenses.doc",} }, { "data":{ "name":"Resume.doc", "value":"25kb", "type":"Resume","path":"//Documents/Work/Resume.doc" } }]}, 
          { "data":{ "name":"Home", "value":"20kb", "type":"Folder","path":"//Documents/Home" }
          ,"children":[ { "data":{ "name":"Invoices", "value":"20kb", "type":"Text","path":"//Home/Work/Invoices" } } ] } 
        ] }, 
      { "data":{ "name":"Pictures", "value":"150kb", "type":"Folder","path":"//Pictures" }
      ,"children":[ { "data":{ "name":"barcelona", "value":"90kb", "type":"Picture","path":"//Pictures/barcelona" } }, { "data":{ "name":"primeui", "value":"30kb", "type":"Picture","path":"//Pictures/primeui" } }, { "data":{ "name":"primeui", "value":"30kb", "type":"Picture","path":"//Pictures/primeui" } } ] } 
    ];
    this.treetablecolumns = Object.keys(this.treetabledata[0]["data"]);//
  }
  treetableselectdata = [];//TreeNode[];
  treetableselectdatakeys(){ if(this.treetableselectdata == null || this.treetableselectdata.length < 1) return []; return Object.keys(this.treetableselectdata[0].node); }
  //clicktreecheck(data,value) { alert("---clicktreecheck---"+JSON.stringify(data) +"#"+value); }
  onNodeSelect(event) { this.updateTable(); }
  onNodeUnselect(event) { this.updateTable(); };
  onHeaderCheckboxToggle(event) { this.updateTable(); }//전체 체크
  updateTable(){
    console.log("--------------updateTable start ---"+ (Array.isArray(this.treetableselectdata)) +":"+ Flatted.stringify(this.treetableselectdata));
    
    let datas = this.treetableselectdata;

    let set = new Set(); 
    datas = datas.filter((o)=>{
      if(o["children"]!=null && o["children"].length >0) return false;
      let path = o.data.path;
      let column = path;
      column = column.replace("//","").replace("/","_");
      if(path.includes("["))
      {
        path = path.split("[")[0] +"[*]"+ path.split("]")[1];
        column = column.split("[")[0] +""+ column.split("]")[1];
      } 
      if(set.has(path)) return false; set.add(path);
      o.data.path = path;
      o.data.column = column;
      return true;
    });//dup 제거

    if(datas == null || datas.length < 1) return;
    this.table.clearTable();

    datas.forEach((o,i)=>{
      //console.log("\t ---updateTable - "+ i +">"+ (Array.isArray(o)) +">"+ o +":"+ "#name="+o.data.name+ "#type="+o.data.type+ "#path="+o.data.path);//Flatted.stringify(k));
      let path = o.data.path;
      let column = o.data.column;
      //if(path.includes("[")) path = path.split("[")[0] +"[*]"+ path.split("]")[1];
      //let column = path.replace("//","").replace("/","_");
      let mydata = {path:o.data.path,columnname:column,columntype:'string',pk:'N'};
      if(i==0) this.table.setColumn(mydata);
      this.table.addData(mydata);
    });

    console.log("--------------updateTable end   ---"+ this.table.getDataLength());
  }
  ////////////////////////////////////////////////////////// alasql
  sql_tablename = "-";
  sql_createtable(event) {
    //let columns = this.table.getColumn();
    let datas = this.table.getData();
    let columns = datas.map(o=>o["columnname"]);

    let sqlcolumn = "";
    columns.forEach((column,i)=>{
      if(i==0) sqlcolumn = column +" string";
      else sqlcolumn = sqlcolumn +","+ column +" string";
    });
    let sql = "create table "+ this.sql_tablename +" ( " + sqlcolumn +" ) ";
    //console.log("\t #sql_createtable sql="+ sql);
    let rs = this.dblocal.createtable(sql);
    this.jsonObject = "createtable-"+ rs;
  }
  sql_insert(){
    let datas = this.table.getData();
    let columns = datas.map(o=>o["columnname"]);

    let sqlcolumn = "";
    let sqlvalue = "";
    columns.forEach((column,i)=>{
      if(i==0) sqlcolumn = column;
      else sqlcolumn = sqlcolumn +","+ column;
      if(i==0) sqlvalue = ":"+column;
      else sqlvalue = sqlvalue +",:"+ column;
    });
    let sql = "insert into "+ this.sql_tablename +" ("+sqlcolumn +") values ("+ sqlvalue +")";
    console.log("\t #sql_insert sql="+ sql);

    /////////////////// pkpath
    let pkpath = datas[0]["path"];//첫번째 path
    let pkpatchsearchs = JsonPathUtil.searchObjects(datas,"//*[pk='Y']/path");//1.pk path
    if(pkpatchsearchs != null && Object.keys(pkpatchsearchs).length>0) pkpath = pkpatchsearchs["path"];
    else
    {
      let data = datas.find(data=>data["path"].includes("[*]"));//2.array path
      if(data != null && Object.keys(data).length>0) pkpath = data["path"];
      LogUtil.debug("=== 2 #pkpath="+ JSON.stringify(pkpath));// +"#data="+JSON.stringify(data));
    }

    //////////////////// 
    let editordata = JSON.parse(this.editordata);
    let pkvalues = JsonPathUtil.searchObjects(editordata,pkpath);
    LogUtil.debug("=== #pkpath="+ JSON.stringify(pkpath) +"#pkvalues="+ JSON.stringify(pkvalues));

    let count = 0;
    pkvalues.forEach((pk,pki)=>{
      let sqldata = {};
      let paths = datas.map(o=>o["path"]);
      paths.forEach((path,pathi)=>{
        let column = columns[pathi];
        let searchs = JsonPathUtil.searchObjects(editordata,path);
        let value = "";
        if(searchs!=null&&searchs.length>0)
        {
          if(path.includes("[*]")) value = searchs[pki];
          else value = searchs[0];//항목중 array아닌 경우
        }
        sqldata[column] = value;
      });
      console.log("\t #sql_insert sqldata=" + JSON.stringify(sqldata));
      count = count + this.dblocal.insert_pstmt(sql,sqldata);
    });
    this.jsonObject = "insert-"+ count;
    // let sqldata = {};
    // let paths = datas.map(o=>o["path"]);
    // paths.forEach((path,i)=>{
    //   let searchs = JsonPathUtil.searchObjects(editordata,path);
    //   let column = columns[i];
    //   let value = (searchs==null||searchs.length<1) ? "":searchs[0];
    //   sqldata[column] = value;
    // });
    // console.log("\t #sql_insert sqldata=" + JSON.stringify(sqldata));
    // let rs = this.dblocal.insert_pstmt(sql,sqldata);
    // this.jsonObject = "insert-"+ rs;
  }
  sql_select(){
    let sql = "select * from "+ this.sql_tablename;
    let rs = this.dblocal.select(sql);
    console.log("\t #sql_select rs=" + JSON.stringify(rs));
    if(rs == null || rs.length < 1) return;
    let columns = Object.keys(rs[0]);

    this.sql_table.clearTable();
    rs.forEach((data,i)=>{
      if(i==0) this.sql_table.setColumn(data);
      this.sql_table.addData(data);
    });
  }
  sql_dbinfo(){ this.jsonObject = this.dblocal.dbinfo(); }

  ////////////////////////////////////////////////////////// sub
  appdatasub = "/toclient/appdata";
  appdatareply = "-";
  appdatatime = "-";
  appdatasubstop = false;
  clickAppdataStop(){ this.appdatasubstop = true; }
  clickAppdataClear(){ this.mapclear(); }
  curKey;
  jsonObject;
  clickKey(key){
    //this.mapclear();
    this.curKey = key;
    this.table.clearTable();
    this.sql_table.clearTable();
    this.sql_tablename = "table_"+ key;

    let json = this.map.get(key);
    this.jsonObject = json;

    this.setEditordata(json);
    this.jsonToTree(json);
  }
  jsonToTree(json)
  {
    this.treetabledata = [];
    this.treetableselectdata = [];

    LogUtil.debug("==== jsonToTree json="+JSON.stringify(json));
    this.treetablecolumns = ["name","value","type","path"];
      //{_type_=GAP_DATA, GAP={SRT=0, END=0, ERR=0}, TOTAL={SRT=0, END=0, ERR=0}, app=app-0, ver=v-0, count=69, time=2020-02-07 17:38:40}
      //{_type_=PROCESS_DATA, datas=[{process=0, host=0, time=2020-02-07 17:39:30, cpu=0, memory=0}, {process=1, host=1, time=2020-02-07 17:39:30, cpu=1, memory=1}, {process=2, host=2, time=2020-02-07 17:39:30, cpu=2, memory=2}]}
      Object.keys(json).forEach((k,i)=>{//type,GAP,TOTAL
        let data = json[k];
        let path = "//"+k;
        if(typeof data != 'object') { this.treetabledata.push({data:{name:k,type:'-v-',path:path,value:data},children:[]}); return; }
        if(Array.isArray(data)==false)
        {
          let nextindex = this.treetabledata.push({data:{name:k,type:'-root-',path:path,value:k},children:[]});
          let current = this.treetabledata[nextindex-1];
          this.treetabledata_addchild(current,data,path);
        }
        else//array - datas
        {
          let path = "//"+k;//datas
          let nextindex = this.treetabledata.push({data:{name:k,type:'-root-',path:path,value:k},children:[]});
          let current = this.treetabledata[nextindex-1];
          data.forEach((data2,i2)=>{//{process=0, host=0
            console.log("---data.foreach # "+ JSON.stringify(data2));
            if(typeof data2 != 'object') { this.treetabledata.push({data:{name:data2,type:'-v-',path:path,value:data2},children:[]}); return; }
            let path2 = path+"["+i2+"]";
            let nextindex2 = current["children"].push({data:{name:i2,type:'-i-',path:path2,value:i2},children:[]});
            let current2 = current["children"][nextindex2-1];
            this.treetabledata_addchild(current2,data2,path2);
          });
        }
      });
  }
  treetabledata_addchild(parent,data,parentpath)
  {
    Object.keys(data).forEach((k,i)=>{
      let path = parentpath+"/"+k;
      parent["children"].push({data:{name:k,type:'-v-',path:path,value:data[k]}});
    });
  }

  clickAppdataSub()
  {
    if(this.appdatasubstop==true) { LogUtil.alert("appdatasubstop"); return; }
    //this.no++;
    this.curKey = null;
    this.appdatasubstop = false;
    this.mapclear();

    this.stomp.sub(this.appdatasub).subscribe(payload=>{
      this.log.debug("appdata sub # "+ payload.body);
      this.appdatatime = DateUtil.currentDateString_mmss();
      this.appdatareply = payload.body;
      if(this.appdatareply.length > 40) this.appdatareply = this.appdatareply.substring(0,40);
      let json = JSON.parse(payload.body);
      let datatype = json["_type_"];
      if(this.map.has(datatype)==false) this.mapadd(datatype,json);
    });
  }

  ////////////////////////////////////////////////////////// map key,value
  map : Map<string,object>;// = new Map();
  mapclear() { this.map.clear(); }
  mapkeys(){ 
    //if(this.curKey != null && this.curKey != 'all') return [this.curKey];//tag가 선택되면 해당 tag만 리턴 > 오른쪽화면에 해당 tag만 표시
    return Array.from(this.map.keys()); 
  }//if(this.map.size < 1) return []; 
  //mapkeysall(){ return ["all"].concat(Array.from(this.map.keys())); }//if(this.map.size < 1) return []; 
  mapadd(key,value) {
    //if(this.map.has(key)==false) { this.map.set(type,new Map<string,string>()); }
    this.map.set(key,value);
  }
  mapinit() { 
    this.map = new Map();
    this.mapadd("testobject",{id:"1",name:"11",address:"111"}); 
    this.mapadd("testarray",{type:"testarray",root:[{id:"1",name:"11",address:"111"},{id:"2",name:"22",address:"222"}]}); 
  }

}
