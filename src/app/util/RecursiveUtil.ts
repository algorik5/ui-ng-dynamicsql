//import { LoggingService } from "../logging/logging.service";
import { StringUtil } from "./StringUtil";
//import { NzTreeNodeOptions } from "ng-zorro-antd";

export class RecursiveUtil
{
  //RecursiveUtil() {}
  //constructor(private logging: LoggingService) { }
  //constructor(){}
  debugmsgs = [];
  constructor(debugmsgs){ this.debugmsgs = debugmsgs; }

  private datas = [];
  private jsonpaths = []; 
  getJsonPaths() { return this.jsonpaths; }
  private treenodes = []; 
  getTreeNodes() { return this.treenodes; }

  recursive(datas)
  {
    this.map.clear();

    this.datas = datas;
    this.jsonpaths = [];
    this.jsonpaths.push("/*");//root추가

    let root = {title:"root",key:"/*",isLeaf:false,children:[]};//root추가
    this.treenodes.push(root);
    this.map.set("/",root);

    if(Array.isArray(datas)) datas.forEach((data)=>{ this.recursive_real("/",data,1); });
    if(typeof(datas)=='object') this.recursive_real("/",datas,1);
  }
  private recursive_real(parent,obj,no)
  {
    Object.keys(obj).forEach( field => {//흠 Object.keys는 array인 경우 field가 index임
      let data = obj[field];
      if(Array.isArray(data)) 
      {
        //this.debugmsgs.push("\t --- array  #  recursive_object parent #no="+ no +"#parent="+ parent +"#field="+ field);
        let pathname = parent +"/"+ field;
        //this.jsonpaths.push(pathname);
        this.addJsonPath(parent,field);
        data.forEach((data2)=>{ this.recursive_real(pathname,data2,no); });
      }
      else if(typeof(data)=='object') 
      {
        //this.debugmsgs.push("\t --- object #  recursive_object parent #no="+ no +"#parent="+ parent +"#field="+ field);
        let pathname = parent +"/"+ field;
        //this.jsonpaths.push(pathname);
        this.addJsonPath(parent,field);
        this.recursive_real(pathname,data,no++);
      }
    });
  }
  private addJsonPath(parent,field)
  {
    if(this.jsonpaths.includes(parent +"/"+ field)) return;

    this.jsonpaths.push(parent +"/"+ field);
    this.addTreeNode(parent,field);
  }

  map:Map<string,any> = new Map();
  private addTreeNode(parent,field)
  {
    //this.debugmsgs.push("--- addTreeNode #parent="+ parent +"#field="+ field);// +":"+ this.searchobject);
    if(parent=="/")
    {
      let path = parent+"/"+field;
      let node = {title:field,key:path,isLeaf:true,children:[]};//key에 path를 넣고 검색시 사용
      //this.treenodes.push(node);
      let searchs = this.map.get("/");//root에 추가
      searchs.isLeaf = false;
      searchs.children.push(node);
      this.map.set(path,node);
    } else{
      let path = parent+"/"+field;
      //if(this.map.has(path)) return;//array의 경우 동일구조가 반복 수행됨 (위 jsonpath에서 걸림)

      //this.debugmsgs.push("\t --- addTreeNode #path="+ path);// +":"+ this.searchobject);
      let node = {title:field,key:path,isLeaf:true,children:[]};//key에 path를 넣고 검색시 사용

      let searchs = this.map.get(parent);
      searchs.isLeaf = false;
      searchs.children.push(node);
      this.map.set(path,node);
    }
  }








  //testtreenodes : NzTreeNodeOptions[] = [ {
  testtreenodes : [any] = [ {
    title   : 'parent 1', key     : '100', expanded: true,
    children: [ {
      title   : 'parent 1-0', key     : '1001', expanded: true,
      children: [
        { title: 'leaf11', key: '10010', isLeaf: true },
        { title: 'leaf12', key: '10011', isLeaf: true },
        { title: 'leaf13', key: '10012', isLeaf: true }
      ]
    },{
      title   : 'parent 1-2', key     : '1003',
      children: [
        { title: 'leaf21', key: '10030', isLeaf: true },
        { title: 'leaf22', key: '10031', isLeaf: true }
      ]
    } ]
  } ];
  testdatas = {
    "person": {"id": 31, "color": "silver", "name": "Volvo"}
    ,"car": [
        {"id": 11, "color": "silver", "name": "Volvo"},
      ]
    ,"bike": [
        {"id": 20, "color": "black", "name": "Cannondale"},
        {"id": 21, "color": "red",   "name": "Shimano"
          ,"bike2":{ "id":201,"data":"ddd"}
          ,"bikelist": [ { "id":211,"data":"ddd1"},{ "id":212,"data":"ddd2"}]
          ,"bikenest":{ "nest": {"id":2001,"data":"ddd"}}
        }
      ]
     ,"car2": [
        {"id": 31, "color": "silver", "name": "Volvo"},
      ]
    };


  // checked = true;
  // check(){
  //   let newState = !this.checked;
  //   this.checked = newState;
  //   this.checkRecursive(newState);
  // }
  // checkRecursive(state){
  //   this.directories.forEach(d => {
  //       d.checked = state;
  //       d.checkRecursive(state);
  //   })
  // }    
}

