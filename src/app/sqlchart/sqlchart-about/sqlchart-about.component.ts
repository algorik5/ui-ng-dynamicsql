import { Component, OnInit } from '@angular/core';
import { LogUtil } from 'src/app/util/LogUtil';
import { StompService } from 'src/app/aservices/stomp.service';
import { LogService } from 'src/app/aservices/log.service';
import { DateUtil } from 'src/app/util/DateUtil';
import { TreeNode } from 'primeng/api';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import Handsontable from 'handsontable';
import { HttpClient, HttpParams } from '@angular/common/http';

declare var Flatted;

@Component({
  selector: 'app-sqlchart-about',
  templateUrl: './sqlchart-about.component.html',
  styleUrls: ['./sqlchart-about.component.scss']
})
export class SqlchartAboutComponent implements OnInit {

  constructor(private http:HttpClient,private log:LogService,private stomp:StompService) { 
  }

  ngOnInit() {
    this.mapinit();
    this.initHotDatas();
  }
  tagColor(name)
  {
    if(name.includes("ERR")) return "red";
    if(name.includes("ver")) return "red";
    if(name.includes("xxx")) return "green";
    return "blue";
  }

  ////////////////////////////////////////////////////////// json view 
  jsonObject;

  ////////////////////////////////////////////////////////// chart
  //stackedBarData = {};
  //stackedBarOptions = {};
  stackedBarData = {
    labels: ['Quantity', 'Leads', 'Sold', 'Restocking', 'Misc'],
    datasets: [
      { label: 'Dataset 1', data: [65000, 29123, 35213, 51213, 16932], },
      { label: 'Dataset 2', data: [32432, 21312, 56456, 21312, 34234], },
      { label: 'Dataset 3', data: [12312, 23232, 34232, 12312, 34234], },
    ],
  };
  stackedBarOptions = {
    title: 'Stacked bar (discrete)',
    axes: {
      left: { primary: true, stacked: true, },
      bottom: { scaleType: 'labels', secondary: true, },
    },
    height: '400px',
  };
  ////////////////////////////////////////////////////////// click
  clickX(x) {}
  clickY(y) {}
  clickLegend(legend) {}

  ////////////////////////////////////////////////////////// sql
  sql = "select * from SERVER order by host,time";
  sqlrownum = "10";
  sqlrs = [];
  sqlcolumns = [];
  clickSQL()
  {
    let url = "http://localhost:18080/dynamicsql/dynamicSelect";
    let params = new HttpParams().set("sql",this.sql).set("rownum",this.sqlrownum);
    this.http.get<any>(url,{params:params}).subscribe(
      res=>{ 
        this.jsonObject = res;
        this.sqlrs = res;//.length;

        if(this.sqlrs == null) return [];
        if(this.sqlrs.length < 1) return [];

        this.sqlcolumns = Object.keys(this.sqlrs[0]);

        let columns = {}; Object.keys(this.sqlrs[0]).forEach(k=>{ columns[k] = k; });
        this.hotDatas = [columns].concat(this.sqlrs);
      }
      ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
    );
  }


  //////////////////////////////// hansometable
  hotId = "id-1";
  hotSettings:Handsontable.GridSettings = { 
    //data:this.hotDatas,
    rowHeaders:true,//(or [a,b,c]
    stretchH:"all"
  };
  hotDatas = [];//[{id:1,name:'name1'},{id:2,name:'name2'}];
  initHotDatas() { 
    //this.hotDatas = [{id:1,name:'name1'},{id:2,name:'name2'}];  
    let datas = [{id:1,name:'name111',desc:'desc111'},{id:2,name:'name222',desc:'desc222'},{id:3,name:'name333',desc:'desc333'}]; 
    let columns = {}; Object.keys(datas[0]).forEach(k=>{ columns[k] = k; });
    this.hotDatas = [columns].concat(datas);
  }
  // clickChangeData(evnet) { 
  //   let datas = [{id:1,name:'name111',desc:'desc111'},{id:2,name:'name222',desc:'desc222'},{id:3,name:'name333',desc:'desc333'}]; 
  //   let columns = {}; Object.keys(datas).forEach(k=>{ columns[k] = k; });
  //   this.hotDatas = [columns].concat(datas);
  // }



  ////////////////////////////////////////////////////////// sub
  appdatasub = "/toclient/appdata";
  appdatareply = "-";
  appdatatime = "-";
  appdatasubstop = false;
  clickAppdataStop(){ this.appdatasubstop = true; }
  clickAppdataClear(){ this.mapclear(); }
  curKey;
  clickKey(key){
    //this.mapclear();
    this.curKey = key;
    
    let json = this.map.get(key);
    this.jsonObject = json;


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


      //{_type_=GAP_DATA, GAP={SRT=0, END=0, ERR=0}, TOTAL={SRT=0, END=0, ERR=0}, app=app-0, ver=v-0, count=69, time=2020-02-07 17:38:40}
      //{_type_=PROCESS_DATA, datas=[{process=0, host=0, time=2020-02-07 17:39:30, cpu=0, memory=0}, {process=1, host=1, time=2020-02-07 17:39:30, cpu=1, memory=1}, {process=2, host=2, time=2020-02-07 17:39:30, cpu=2, memory=2}]}
      // Object.keys(json).forEach((k,i)=>{//GAP,TOTAL
      //   let data = json[k];
      //   if(typeof data != 'object') return;//_type_,app
      //   if(Array.isArray(data)==false)
      //   {
      //     Object.keys(data).forEach((k2,i2)=>{//SRT,END
      //       let datatype = k+"."+k2;//GAP.SRT
      //       let datakey = json["app"];
      //       let datavalue = data[k2];
      //       this.mapadd(datatype,datakey,datavalue);
      //     });
      //   }
      //   else//array - datas
      //   {
      //     data.forEach((data2,i2)=>{//{process=0, host=0
      //       Object.keys(data2).forEach((k3,i3)=>{//process,host,cpu
      //         let datatype = k+"."+k3;//datas.cpu
      //         let datakey = data2["process"]+"."+data2["host"];
      //         let datavalue = data2[k3];
      //         this.mapadd(datatype,datakey,datavalue);
      //       });
      //     });
      //   }
      // });
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
    // this.mapadd("app1","v1"); 
    // this.mapadd("app2","v2");
    this.mapadd("type1",{id:"id1",name:"name2"}); 
    this.mapadd("type2",{id1:"id1",name1:"name2"});
  }

  ////////////////////////////////////////////////////////// map 
  // map : Map<string,Map<string,string>>;// = new Map();
  // mapclear() { this.map.clear(); }
  // mapchildclear() { this.map.forEach((k,v)=>{ k.clear(); }) }
  // mapkeys(){ 
  //   if(this.curKey != null && this.curKey != 'all') return [this.curKey];//tag가 선택되면 해당 tag만 리턴 > 오른쪽화면에 해당 tag만 표시
  //   return Array.from(this.map.keys()); 
  // }//if(this.map.size < 1) return []; 
  // mapkeysall(){ return ["all"].concat(Array.from(this.map.keys())); }//if(this.map.size < 1) return []; 
  // mapchildkeys(type) { return Array.from(this.map.get(type).keys()).sort(); }
  // mapchildvalue(type,key){ return this.map.get(type).get(key); }
  // mapadd(type,key,value) {
  //   if(this.map.has(type)==false) { this.map.set(type,new Map<string,string>()); }
  //   this.map.get(type).set(key,value);
  // }
  // mapinit() { 
  //   this.map = new Map();
  //   this.mapadd("ver","app1","v1"); this.mapadd("ver","app2","v2");
  //   this.mapadd("uptime","app1","u1");
  // }



}
