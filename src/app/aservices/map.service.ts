import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { this.test_data(); }

  map : Map<string,object> = new Map();

  clear() { this.map.clear(); }
  get(key) { return this.map.get(key); }
  set(key,value) { this.map.set(key,value); }

  keysToArray() { return Array.from(this.map.keys()); }
  valuesToArray() { return Array.from(this.map.values()); }

  //sort
  keysToArray_sort() { return Array.from(this.map.keys()).sort(); }
  valuesToArray_sort() { return Array.from(this.map.values()).sort(); }




  ///////////////////////////////// top 3
  test_top3()//
  {
    let array = Array.from(this.map);
    array.sort((old,cur)=>Number(cur[1])-Number(old[1]));
    let top3 = array.filter((v,i)=>i<3);
    let top3keys = top3.map(o=>o[0]);
    let top3values = top3.map(o=>o[1]);
  }

  //////////////////////////////////////////// test
  test_data() {
    this.set("testobject",{id:"1",name:"11",address:"111"}); 
    this.set("testarray",{type:"testarray",root:[{id:"1",name:"11",address:"111"},{id:"2",name:"22",address:"222"}]}); 
  }
}
