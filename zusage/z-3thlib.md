
# ngx-echarts
- npm install echarts ngx-echarts @types/echarts
- module.ts - NgxEchartsModule
- html
- ts


# angular flex-layout
- npm i @angular/flex-layout@8.0.0-beta.27
  - @angular/cdk 미설치시 설치
  - 8버젼으로 설치 - 9버젼의 경우 ambient context 에러 발생
- module.ts - FlexLayoutModule 
- ts
  - <div fxLayout="row" fxLayoutAlign="space-between"> input... button ...</div>
- (주의) carbon input,button을 1row에 표현하려면 ng flex사용해야 함(또는 carbon grid/row/col 등으로 표현)

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
- 주의
  - pstmt를 사용하려면 alasql.compile 사용해야함 >>> new alasql.Database()로는 compile사용불가

# treetable - primeng
- (참고-checkbox,selection 등) https://primefaces.org/primeng/#/treetable/selection
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


----------------------------------------------------------------- 참고



----------------------------------------------------------------- 사용안함
# flatted - circular 에러 - 사용하지마 - 출력값이 이상함
- 내장되어 있음 - install 불필요
- angular.json
  - scripts : "node_modules/flatted/min.js",
- ts : 
  - declare var Flatted;
  - Flatted.stringify(json);

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

###### table/grid 목록 https://jspreadsheets.com/
- --(jquery) w2ui - http://w2ui.com/web/demos/#!utils	http://w2ui.com/web/demo/utils
- **(pivot) agGrid - https://www.ag-grid.com/
- *http://tabulator.info/docs/4.5/frameworks#angular
=== https://www.ag-grid.com/angular-grid/
	npm install ag-grid-community ag-grid-angular
=== http://tabulator.info/docs/4.5/frameworks#angular
	***https://github.com/olifolkerd/tabulator/issues/1509
	npm install tabulator-tables
	import Tabulator from 'tabulator-tables';

# 기타
- fuse.js - fuzzy search
- hammerjs - 제스처





ng-bootstrap

