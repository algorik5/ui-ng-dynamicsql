# typescript playground
- https://www.typescriptlang.org/play/


# service는 모듈 사용하지 않음
- ng g s aservices/stomp
- constructor(private stomp:StompService)

# 양방향 바인딩
- <input ibmText [(ngModel)]="var1">

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

# 개발 표준
- 항상 type을 선언하라 > str:string ...
- 모든 로직은 service로 생성하라 (또는 utilclass+static함수)
- layout 주의
	~왼쪽크기 고정 - min-width,max-width
	~주의-항상 cell안에 넣어야함

# 기타
- ngfor=...this.var 가능
- ngcontainer ngif=advancedsearch...
- pretty json - strigify obj,null,2
  - (O) carbon textarea
  - (X) primeng/quill rich editor

# 에러
- ambient context - package.json > ng 8 사용

# typescript
- 디폴트값 - let xxx||0
- arguments.callee.toString() > strict ?



# rich editor 
- primeng(quill.js)  
- npm install quill  
- styles - quoll.core.css,quill.snow.css  
- imports editormodule  
- <p-editor ngmodel=editordata style=height:100px

