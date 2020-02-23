import { Injectable } from '@angular/core';
import { LogUtil } from '../util/LogUtil';

declare var alasql;

@Injectable({
  providedIn: 'root'
})
export class StoreService {
/*


https://angular.io/guide/dependency-injection-in-action
=================== indexeddb
=== 개발자도구>app>storage>indexeddb
*@ngxs-labs/data > https://github.com/ngxs-labs/data
*dexie > https://dexie.org/
-@ngx-pwa/local-storage > https://github.com/cyrilletuzi/angular-async-local-storage
-idb > https://github.com/jakearchibald/idb

npm install dexie
import Dexie from 'dexie';



*/
  constructor() { }

  createdb()
  {
    //CREATE INDEXEDDB DATABASE IF NOT EXISTS idbtest;\
    // ATTACH INDEXEDDB DATABASE idbtest; \
    // USE geo;
    alasql.exec("CREATE INDEXEDDB DATABASE IF NOT EXISTS idbtest");
    LogUtil.debug("=== dbinfo === "+ alasql.databases);
  }

  set()
  {

  }

  get()
  {

  }
}
