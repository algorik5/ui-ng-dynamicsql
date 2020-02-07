import { Component, OnInit } from '@angular/core';
import { LogUtil } from 'src/app/util/LogUtil';
import { StompService } from 'src/app/aservices/stomp.service';
import { LogService } from 'src/app/aservices/log.service';
import { DateUtil } from 'src/app/util/DateUtil';

@Component({
  selector: 'app-stompui-about',
  templateUrl: './stompui-about.component.html',
  styleUrls: ['./stompui-about.component.scss']
})
export class StompuiAboutComponent implements OnInit {

  constructor(private log:LogService,private stomp:StompService) { 
    this.mapinit();
  }

  ngOnInit() {
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

  ////////////////////////////////////////////////////////// pub
  hellopub = "/toserver/hello";
  hellosub = "/toclient/hello";
  helloreply = "-";
  no = 0;
  clickPub()
  {
    this.no++;
    this.stomp.sub(this.hellosub).subscribe(payload=>{
      this.log.debug("hello sub # "+ payload);
      this.helloreply = payload.body;
    })
    this.stomp.pub(this.hellopub,{count:this.no,msg:"hello"});
  }

  ////////////////////////////////////////////////////////// sub
  timerpub = "/toserver/timer";
  timersub = "/toclient/timer";
  timerreply = "-";
  clickSub()
  {
    this.no++;
    this.stomp.sub(this.timersub).subscribe(payload=>{
      this.log.debug("timer sub # "+ payload);
      this.timerreply = payload.body;
    })
    //this.stomp.pub(this.timerpub,{count:this.no,msg:"timer"});
  }
  ////////////////////////////////////////////////////////// sub
  appdatasub = "/toclient/appdata";
  appdatareply = "-";
  appdatatime = "-";
  appdatasubstop = false;
  clickAppdataStop(){ this.appdatasubstop = true; }
  clickAppdataClear(){ this.mapchildclear(); }
  curKey;
  clickKey(key){
    this.curKey = key;
    //this.mapclear();
  }
  tagColor(name)
  {
    if(name.includes("ERR")) return "red";
    if(name.includes("ver")) return "red";
    if(name.includes("xxx")) return "green";
    return "blue";
  }
  clickAppdataSub()
  {
    if(this.appdatasubstop==true) { LogUtil.alert("appdatasubstop"); return; }
    this.no++;
    this.curKey = null;
    this.appdatasubstop = false;
    this.mapclear();

    this.stomp.sub(this.appdatasub).subscribe(payload=>{
      //this.log.debug("appdata sub # "+ payload);
      this.appdatatime = DateUtil.currentDateString_mmss();
      this.appdatareply = payload.body;
      if(this.appdatareply.length > 40) this.appdatareply = this.appdatareply.substring(0,40);
      let json = JSON.parse(payload.body);

      //{"app":"app-2","ver":"v-2","count":2,"time":"2020-02-02 16:48:21","msg":"timer"}
      // this.mapadd("ver",json["app"],json["ver"]);
      // this.mapadd("count",json["app"],json["count"]);
      
      //last={"GAP":{"SRT":2,"END":2,"ERR":2},"TOTAL":{"SRT":2,"END":2,"ERR":2},"APP":{"app":"app-2","ver":"v-2","count":11,"time":"2020-02-02 17:26:12"}}      
      // this.mapadd("ver",json["app"],json["APP"]["ver"]);
      // this.mapadd("time",json["app"],json["APP"]["time"]);
 

      //{_type_=GAP_DATA, GAP={SRT=0, END=0, ERR=0}, TOTAL={SRT=0, END=0, ERR=0}, app=app-0, ver=v-0, count=69, time=2020-02-07 17:38:40}
      //{_type_=PROCESS_DATA, datas=[{process=0, host=0, time=2020-02-07 17:39:30, cpu=0, memory=0}, {process=1, host=1, time=2020-02-07 17:39:30, cpu=1, memory=1}, {process=2, host=2, time=2020-02-07 17:39:30, cpu=2, memory=2}]}
      Object.keys(json).forEach((k,i)=>{//GAP,TOTAL
        let data = json[k];
        if(typeof data != 'object') return;//_type_,app
        if(Array.isArray(data)==false)
        {
          Object.keys(data).forEach((k2,i2)=>{//SRT,END
            let datatype = k+"."+k2;//GAP.SRT
            let datakey = json["app"];
            let datavalue = data[k2];
            this.mapadd(datatype,datakey,datavalue);
          });
        }
        else//array - datas
        {
          data.forEach((data2,i2)=>{//{process=0, host=0
            Object.keys(data2).forEach((k3,i3)=>{//process,host,cpu
              let datatype = k+"."+k3;//datas.cpu
              let datakey = data2["process"]+"."+data2["host"];
              let datavalue = data2[k3];
              this.mapadd(datatype,datakey,datavalue);
            });
          });
        }
      });
    });
  }

  ////////////////////////////////////////////////////////// map 
  map : Map<string,Map<string,string>>;// = new Map();
  mapclear() { this.map.clear(); }
  mapchildclear() { this.map.forEach((k,v)=>{ k.clear(); }) }
  mapkeys(){ 
    if(this.curKey != null && this.curKey != 'all') return [this.curKey];//tag가 선택되면 해당 tag만 리턴 > 오른쪽화면에 해당 tag만 표시
    return Array.from(this.map.keys()); 
  }//if(this.map.size < 1) return []; 
  mapkeysall(){ return ["all"].concat(Array.from(this.map.keys())); }//if(this.map.size < 1) return []; 
  mapchildkeys(type) { return Array.from(this.map.get(type).keys()).sort(); }
  mapchildvalue(type,key){ return this.map.get(type).get(key); }
  mapadd(type,key,value) {
    if(this.map.has(type)==false) { this.map.set(type,new Map<string,string>()); }
    this.map.get(type).set(key,value);
  }
  mapinit() { 
    this.map = new Map();
    this.mapadd("ver","app1","v1"); this.mapadd("ver","app2","v2");
    this.mapadd("uptime","app1","u1");
  }

}
