import { Injectable, ɵRenderDebugInfo } from '@angular/core';
import { LogUtil } from '../util/LogUtil';

declare var alasql;

@Injectable({
  providedIn: 'root'
})
export class DblocalService {

  constructor() { }

  dbinfo()
  {
    return alasql.databases;//alasql.databases alasql.databases.alasql alasql.tables 
  }

  createtable(sql:string)
  {
    LogUtil.debug("=== createtable === "+ sql);
    let rs = alasql.exec(sql);
    return rs;
  }

  select(sql:string)
  {
    LogUtil.debug("=== select === "+ sql);
    let rs = alasql.exec(sql);
    LogUtil.debug("=== select === #rs="+ rs);
    return rs;
  }

  insert(sql:string)
  {
    LogUtil.debug("=== insert === "+ sql);
    let rs = alasql.exec(sql);
    LogUtil.debug("=== insert === #rs="+ rs);
    return rs;
  }

  //pstmt..pst.t=alasql.compile(sql(:id)...pstmt(sql)<{id:x,... 
  //주의 - pstmt를 사용하려면 alasql.compile 사용해야 함 <<< alaslq.Database() 사용불가
  insert_pstmt(sql:string,data)
  {
    LogUtil.debug("=== insert_pstmt === "+ sql);
    let pstmt = alasql.compile(sql);//insert into test1 values (:id,:name)
    let rs = pstmt(sql);//{id:x,name:x}
    LogUtil.debug("=== insert_pstmt === #rs="+ rs);
    return rs;
  }
}
