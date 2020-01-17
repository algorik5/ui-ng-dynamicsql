# http 
- module.ts
  - import {HttpClientModule} from '@angular/common/http';
  - imports HttpClientModule
- component.ts
  - constructor(private http:HttpClient) { }
  - let params = new HttpParams().set("sql",sql).set("rownum",rownum);
    this.http.get<any>(url,{params:params}).subscribe(
      res=>{ this.nations = res.map(o=>{return o['NATION']}); }
      ,err=>{ LogUtil.alert('------'+ JSON.stringify(err)) }
    );





