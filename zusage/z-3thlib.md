
# scroll bar (ngx-scrollbar 또는 cdk virtual scroll)
- npm i ngx-scrollbar @angular/cdk@8.2.3
  - (주의) @angular/cdk 9버젼은 에러 >>> An accessor cannot be declared in an ambient context==>tyscript version 문제인듯
- module.ts - NgScrollbarModule
- html - <ng-scrollbar> ... </ng-scrollbar>


# ngx-json-viewer
- npm install ngx-json-viewer
- module.ts : NgxJsonViewerModule 
- html : <ngx-json-viewer [json]="jsonObject" [expanded]="true"></ngx-json-viewer>
- ts : jsonObject = {...


# defiant.js
- npm install defiant.js
- angular.json
  - scripts : node_modules\defiant.js\dist\defiant.js
- ts
  - declare var defiant
  - let searches = defiant.search(this.testdata,path);//없으면 [] 리턴(무조건 array리턴)
- (참고) JsonPathUtil.ts

# hansometable
- *** 주의 - 데이터 변경시 2번 클릭해야 데이터가 반영됨
- npm install handsontable @handsontable/angular
- styles.scss : @import '~handsontable/dist/handsontable.full.css';
- module.ts : HotTableModule
- html
  - <hot-table [hotId]="hotId" [settings]="hotSettings" [data]="hotDatas" licenseKey="non-commercial-and-evaluation"></hot-table>
- ts
  - hotId = "id-1";
  - hotSettings:Handsontable.GridSettings = { rowHeaders:true,stretchH:"all" };
  - hotDatas = [{id:1,name:'name1'},{id:2,name:'name2'}];

# alasql (불가-alasql-angular)
- npm install alasql
- angular.json
  - node_modules/alasql/dist/alasql.min.js
- ts
  - declare var alasql
  - db = new alasql.Database()
  - rs = db.exec(sql) (===alasql(sql)
- 참고 - alasql to hansometable
  - let rs1 = this.db.exec("select * from test1 order by id");
  - let columns = {}; Object.keys(rs1[0]).forEach(k=>{ columns[k] = k; });
  - this.hotDatas1 = [columns].concat(rs1);
- 향후
  - pstmt : 테스트 실패

# treetable - primeng
- npm install @angular/cdk
- npm install primeng primeicons
- angular.json
  - node_modules/primeicons/primeicons.css
  - node_modules/primeng/resources/themes/nova-light/theme.css
  - node_modules/primeng/resources/primeng.min.css
- module.ts
  - TreeTableModule <<< import {TreeTableModule} from 'primeng/treetable'
- html
  ```
        <p-treeTable [value]="treetabledata">
            <ng-template pTemplate="header" let-columns> 
                <tr> 
                    <th *ngFor="let col of treetablecolumns"> {{col}} </th> 
                </tr> 
            </ng-template>
            <ng-template pTemplate="body" let-rowNode let-rowData="rowData">
                <tr>
                    <td *ngFor="let col of treetablecolumns; let i = index">
                        <p-treeTableToggler [rowNode]="rowNode" *ngIf="i == 0"></p-treeTableToggler>
                        {{rowData[col]}}
                    </td>
                </tr>
            </ng-template>
        </p-treeTable>        
  ```
- ts
  ```
  treetablecolumns = [];
  treetabledata = [];
  inittreetabledata(){
    this.treetabledata = [ 
      { "data":{ "name":"Documents", "size":"75kb", "type":"Folder" },"children":[{ "data":{ "name":"Work", "size":"55kb", "type":"Folder" }, "children":[{ "data":{ "name":"Expenses.doc", "size":"30kb", "type":"Document" } }, { "data":{ "name":"Resume.doc", "size":"25kb", "type":"Resume" } }]}, 
      { "data":{ "name":"Home", "size":"20kb", "type":"Folder" },"children":[ { "data":{ "name":"Invoices", "size":"20kb", "type":"Text" } } ] } ] }, 
      { "data":{ "name":"Pictures", "size":"150kb", "type":"Folder" },"children":[ { "data":{ "name":"barcelona.jpg", "size":"90kb", "type":"Picture" } }, { "data":{ "name":"primeui.png", "size":"30kb", "type":"Picture" } }, { "data":{ "name":"optimus.jpg", "size":"30kb", "type":"Picture" } } ] } 
    ];
    this.treetablecolumns = Object.keys(this.treetabledata[0]["data"]);
  }
  ```
