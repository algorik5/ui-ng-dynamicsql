import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { this.testdata(); }

  map : Map<string,object> = new Map();

  clear() { this.map.clear(); }
  get(key) { return this.map.get(key); }
  set(key,value) { this.map.set(key,value); }

  keysToArray() { return Array.from(this.map.keys()); }
  valuesToArray() { return Array.from(this.map.values()); }


  //////////////////////////////////////////// test
  testdata() {
    this.set("testobject",{id:"1",name:"11",address:"111"}); 
    this.set("testarray",{type:"testarray",root:[{id:"1",name:"11",address:"111"},{id:"2",name:"22",address:"222"}]}); 
  }
}
