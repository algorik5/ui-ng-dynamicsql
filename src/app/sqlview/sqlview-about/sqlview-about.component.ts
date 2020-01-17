import { Component, OnInit } from '@angular/core';
import { TableModel, TableHeaderItem, TableItem } from 'carbon-components-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogUtil } from 'src/app/util/LogUtil';
import { ObjectUtil } from 'src/app/util/ObjectUtil';
import { MathUtil } from 'src/app/util/MathUtil';

@Component({
  selector: 'app-sqlview-about',
  templateUrl: './sqlview-about.component.html',
  styleUrls: ['./sqlview-about.component.scss']
})
export class SqlviewAboutComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.initTable();
    this.initNations();
  }
  ////////////////////////////////////////////////////////// tag
  nations = ['-'];
  cities = ['-'];  
  curNation;
  curCity;
  initNations()
  {
    let url = "http://localhost:18080/dynamicsql/dynamicSelect";
    let sql = "select distinct nation from persons"+" order by 1";
    let rownum = "10";
    let params = new HttpParams().set("sql",sql).set("rownum",rownum);
    this.http.get<any>(url,{params:params}).subscribe(
      res=>{ this.nations = res.map(o=>{return o['NATION']}); }
      ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
    );
  }
  clickNation(nation)
  {
    this.curNation = nation;
    let url = "http://localhost:18080/dynamicsql/dynamicSelect";
    let sql = "select distinct city from persons where nation='"+nation+"'" +" order by 1";
    let rownum = "10";
    let params = new HttpParams().set("sql",sql).set("rownum",rownum);
    this.http.get<any>(url,{params:params}).subscribe(
      res=>{ this.cities = res.map(o=>{return o['CITY']}); }
      ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
    );
  }
  clickCity(city)
  {
    this.curCity = city;
    let url = "http://localhost:18080/dynamicsql/dynamicSelect";
    let sql = "select * from persons where city='"+city+"'" +" order by 1";
    let rownum = "10";
    let params = new HttpParams().set("sql",sql).set("rownum",rownum);
    this.http.get<any>(url,{params:params}).subscribe(
      res=>{ 
        //LogUtil.alert('------'+ JSON.stringify(res));
        this.tableModel.header = [];
        Object.keys(res[0]).forEach(o => {
          this.tableModel.header.push(new TableHeaderItem({ data: o }));
        });
        this.tableModel.data = [];
        res.forEach(o=>{
          let tablerow = [];
          ObjectUtil.values(o).forEach(o2=>{ tablerow.push(new TableItem({ data: o2 })) });
          this.tableModel.data.push(tablerow);
        });
      }
      ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
    );
  }


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
  clickUpdate(event)
  {
    LogUtil.alert("selectData="+ JSON.stringify(this.selectData));
    let random = MathUtil.random(1,1000);
    let name = this.selectData.find(o=>{ if(o['key']=='NAME') return o})['value'];//jsonobj.series.find(x => x.time == "2001");//1개
    let columns = Object.keys(this.selectData);
    //let values = ObjectUtil.values(this.selectData);
    let str = "";
    for(let i=0;i<this.selectData.length;i++) 
    {
      // if(i==0) str = this.selectData[i]['key'] +"='"+ this.selectData[i]['value'] +"'";
      // else 
      if(this.selectData[i]['key']=="NAME") continue;
      if(this.selectData[i]['key']=="TIME") continue;
      str = str +","+ this.selectData[i]['key'] +"='"+ this.selectData[i]['value'] +"'";
    }
    LogUtil.alert("str="+ str);
    let url = "http://localhost:18080/dynamicsql/dynamicUpdate";
    //let sql = "update persons set time=sysdate,age="+random+" where name='"+name +"'";
    let sql = "update persons set time=sysdate"
      +""+ str
      +" where name='"+name +"'";
    LogUtil.alert("sql="+ sql);
    let params = new HttpParams().set("sql",sql);
    this.http.get<any>(url,{params:params}).subscribe(
      res=>{ LogUtil.alert("res="+ JSON.stringify(res)); }
      ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
    );
  }

}
