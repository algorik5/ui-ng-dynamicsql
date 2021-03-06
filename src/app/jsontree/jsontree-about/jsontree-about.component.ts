import { Component, OnInit } from '@angular/core';
import { LogUtil } from 'src/app/util/LogUtil';
import { StompService } from 'src/app/aservices/stomp.service';
import { LogService } from 'src/app/aservices/log.service';
import { DateUtil } from 'src/app/util/DateUtil';

@Component({
  selector: 'app-jsontree-about',
  templateUrl: './jsontree-about.component.html',
  styleUrls: ['./jsontree-about.component.scss']
})
export class JsontreeAboutComponent implements OnInit {

  constructor(private log:LogService,private stomp:StompService) { 
  }

  ngOnInit() {
    this.mapinit();
    this.inittreetabledata();
  }

  ////////////////////////////////////////////////////////// connect 
  wsurl = "ws://localhost:18080/websocket";
  clickConnect()
  {
    this.stomp.connect(this.wsurl);
  }
  clickDisconnect()
  {
    this.stomp.disconnect();
  }
  isConnected() 
  { 
    return this.stomp.isConnected(); 
  }

  tagColor(name)
  {
    if(name.includes("ERR")) return "red";
    if(name.includes("ver")) return "red";
    if(name.includes("xxx")) return "green";
    return "blue";
  }
  /////////////////////////// treetable/primeng
  treetablecolumns = [];
  treetabledata = [];
  inittreetabledata(){
    this.treetabledata = [ 
      { "data":{ "name":"Documents", "value":"75kb", "type":"Folder" },"children":[{ "data":{ "name":"Work", "size":"55kb", "type":"Folder" }, "children":[{ "data":{ "name":"Expenses.doc", "size":"30kb", "type":"Document" } }, { "data":{ "name":"Resume.doc", "size":"25kb", "type":"Resume" } }]}, 
      { "data":{ "name":"Home", "size":"20kb", "type":"Folder" },"children":[ { "data":{ "name":"Invoices", "size":"20kb", "type":"Text" } } ] } ] }, 
      { "data":{ "name":"Pictures", "size":"150kb", "type":"Folder" },"children":[ { "data":{ "name":"barcelona.jpg", "size":"90kb", "type":"Picture" } }, { "data":{ "name":"primeui.png", "size":"30kb", "type":"Picture" } }, { "data":{ "name":"optimus.jpg", "size":"30kb", "type":"Picture" } } ] } 
    ];
    this.treetablecolumns = Object.keys(this.treetabledata[0]["data"]);
  }
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
    this.treetabledata = [];
    let json = this.map.get(key);
    this.jsonObject = json;

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
