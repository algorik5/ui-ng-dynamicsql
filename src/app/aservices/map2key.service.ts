import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Map2keyService {

  constructor() { this.testdata(); }

  map : Map<string,Map<string,string>> = new Map();

  clear() { this.map.clear(); }
  get(key) { return this.map.get(key); }
  set(key,chidkey,value) {
    if(this.map.has(key)==false) { this.map.set(key,new Map<string,string>()); }
    this.map.get(key).set(chidkey,value);
  }

  keysToArray() { return Array.from(this.map.keys()); }
  valuesToArray() { return Array.from(this.map.values()); }

  

  ///////////////////////////////// child
  childclear() { this.map.forEach((k,v)=>{ k.clear(); }) }
  childkeysToArray(key) { return Array.from(this.map.get(key).keys()); }//.sort()
  childget(key,chidkey){ return this.map.get(key).get(chidkey); }


  ///////////////////////////////// test
  testdata() { 
    this.set("ver","app1","v1"); this.set("ver","app2","v2");
    this.set("uptime","app1","u1");
  }
  
}
