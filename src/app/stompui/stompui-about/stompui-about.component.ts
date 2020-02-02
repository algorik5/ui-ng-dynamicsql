import { Component, OnInit } from '@angular/core';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogUtil } from 'src/app/util/LogUtil';
import { ObjectUtil } from 'src/app/util/ObjectUtil';
import { MathUtil } from 'src/app/util/MathUtil';
import { StompService } from 'src/app/aservices/stomp.service';

@Component({
  selector: 'app-stompui-about',
  templateUrl: './stompui-about.component.html',
  styleUrls: ['./stompui-about.component.scss']
})
export class StompuiAboutComponent implements OnInit {

  constructor(private log:Log,private stomp:StompService) { }

  ngOnInit() {
  }
  ////////////////////////////////////////////////////////// tag
  wsurl = "ws://localhost:18080/websocket";
  stomppub = "/toserver/hello";
  stompsub = "/toclient/hello";

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
  no = 0;
  pubreply = "-";
  clickPub()
  {
    this.no++;
    this.stomp.sub(this.stompsub).subscribe(payload=>{
      this.log.
      this.pubreply = payload;
    })
    this.stomp.pub(this.stomppub,{count:this.no,msg:"hello"});
  }
  // clickCity(city)
  // {
  //   this.curCity = city;
  //   let url = "http://localhost:18080/dynamicsql/dynamicSelect";
  //   let sql = "select * from persons where city='"+city+"'" +" order by 1";
  //   let rownum = "10";
  //   let params = new HttpParams().set("sql",sql).set("rownum",rownum);
  //   this.http.get<any>(url,{params:params}).subscribe(
  //     res=>{ 
  //       //LogUtil.alert('------'+ JSON.stringify(res));
  //       this.tableModel.header = [];
  //       Object.keys(res[0]).forEach(o => {
  //         this.tableModel.header.push(new TableHeaderItem({ data: o }));
  //       });
  //       this.tableModel.data = [];
  //       res.forEach(o=>{
  //         let tablerow = [];
  //         ObjectUtil.values(o).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
  //         this.tableModel.data.push(tablerow);
  //       });
  //     }
  //     ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
  //   );
  // }


  ////////////////////////////////////////////////////////// table
  tableModel = new TableModel();
  initTable() {
    this.tableModel.header = [new TableHeaderItem({ data: 'id' }), new TableHeaderItem({ data: 'name' })];
    this.tableModel.data = [
      [new TableItem({ data: 'id-1' }), new TableItem({ data: 'Name 1' })],
      [new TableItem({ data: 'id-3' }), new TableItem({ data: 'Name 2' })],
      [new TableItem({ data: 'id-2' }), new TableItem({ data: 'Name 3' })],
    ];
  }
  
  selectData;
  clickTableRow(event)
  {
    //LogUtil.alert("event="+ this.stringifyEx(event.model));
    this.selectData = [];
    //LogUtil.alert("event.selectrowindex="+ event.selectedRowIndex);

    let row = event.selectedRowIndex;
    let header = event.model['header'].map(o=>o['data']);
    //LogUtil.alert("event.model['_data']="+ row +":"+ JSON.stringify(event.model['_data'][row]));
    let datas = event.model['_data'][row].map(o=>{return o['data']});
    //LogUtil.alert("datas="+ datas);
    for(let i=0;i<datas.length;i++) this.selectData.push({key:header[i],value:datas[i]});
    //LogUtil.alert("this.selectData="+ JSON.stringify(this.selectData));
  }

  ////////////////////////////////////////////////////////// form
  // clickUpdate(event)
  // {
  //   LogUtil.alert("selectData="+ JSON.stringify(this.selectData));
  //   let random = MathUtil.random(1,1000);
  //   let name = this.selectData.find(o=>{ if(o['key']=='NAME') return o})['value'];//jsonobj.series.find(x => x.time == "2001");//1개
  //   let columns = Object.keys(this.selectData);
  //   //let values = ObjectUtil.values(this.selectData);
  //   let str = "";
  //   for(let i=0;i<this.selectData.length;i++) 
  //   {
  //     // if(i==0) str = this.selectData[i]['key'] +"='"+ this.selectData[i]['value'] +"'";
  //     // else 
  //     if(this.selectData[i]['key']=="NAME") continue;
  //     if(this.selectData[i]['key']=="TIME") continue;
  //     str = str +","+ this.selectData[i]['key'] +"='"+ this.selectData[i]['value'] +"'";
  //   }
  //   LogUtil.alert("str="+ str);
  //   let url = "http://localhost:18080/dynamicsql/dynamicUpdate";
  //   //let sql = "update persons set time=sysdate,age="+random+" where name='"+name +"'";
  //   let sql = "update persons set time=sysdate"
  //     +""+ str
  //     +" where name='"+name +"'";
  //   LogUtil.alert("sql="+ sql);
  //   let params = new HttpParams().set("sql",sql);
  //   this.http.get<any>(url,{params:params}).subscribe(
  //     res=>{ LogUtil.alert("res="+ JSON.stringify(res)); }
  //     ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
  //   );
  // }

}
