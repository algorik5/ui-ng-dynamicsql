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
    //this.jsonToTree(json);
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

    /////////////////// pstmt
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

    //////////////////// binding vaue
    let editordata = JSON.parse(this.editordata);
    let pkvalues = JsonPathUtil.searchObjects(editordata,pkpath);
    LogUtil.debug("=== #pkpath="+ JSON.stringify(pkpath) +"#pkvalues="+ JSON.stringify(pkvalues));

    let count = 0;
    pkvalues.forEach((pk,pki)=>{
      let sqldata = {};
      let paths = datas.map(o=>o["path"]);
      paths.forEach((path,pathi)=>{
        let column = columns[pathi];
        let value = "";
        let searchs = JsonPathUtil.searchObjects(editordata,path);
        if(searchs!=null&&searchs.length>0)
        {
          if(path.includes("[*]")) value = searchs[pki];//array인 경우
          else value = searchs[0];//array아닌 경우
        }
        sqldata[column] = value;
      });
      console.log("\t #sql_insert sqldata=" + JSON.stringify(sqldata));
      count = count + this.dblocal.insert_pstmt(sql,sqldata);
    });
    this.jsonObject = "insert-"+ count;
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
   //this.jsonToTree(json);
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
