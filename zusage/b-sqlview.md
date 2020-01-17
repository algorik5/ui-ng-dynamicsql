# 테스트 페이지 추가
- ng g m sqlview --routing
- ng g c sqlview/sqlview-about
- sqlview-routing.module.ts > { path: '',component: SqlviewAboutComponent }
- app-routing.module.ts > {path: 'sqlview',loadChildren: () => import('./sqlview/sqlview.module').then(m => m.SqlviewModule)}
- header.component.html > [route]="['sqlview']"

# 레이아웃 디자인 (grapesjs) - https://grapesjs.com/demo.html 
- (주의) decorations/border with를 1로 설정
- (주의) text를 넣어서 위치에 이름 표시(input table ...)
- css 복사 > sqlview-about.component.scss
- html 복사 > sqlview-about.component.html

# carbon 넣기
- sqlview-module.ts : imports 추가 (InputModule, ButtonModule, TagModule, TableModule,SearchModule)



# test data
```
 CREATE TABLE "EPOTEST"."PERSONS"
 (	
    "NAME" VARCHAR2(20 BYTE) NOT NULL ENABLE, 
	"NATION" VARCHAR2(20 BYTE), 
	"CITY" VARCHAR2(20 BYTE), 
	"ADDRESS" VARCHAR2(20 BYTE), 
	"AGE" NUMBER(10,0), 
	"COMPANY" VARCHAR2(20 BYTE), 
	"TIME" DATE, 
	 CONSTRAINT "PERSONS_PK" PRIMARY KEY ("NAME")
 )

Insert into EPOTEST.PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aaa','korea','seoul','xxx',569,'ggg',sysdate);
Insert into EPOTEST.PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aa1','korea','seoul','xx1',787,'gg1',sysdate);
Insert into EPOTEST.PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aa2','korea','inchen','xx2',22,'gg2',sysdate);
Insert into EPOTEST.PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aa3','korea','busan','xx3',33,'gg',sysdate);
Insert into EPOTEST.PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('bbb','us','newyork','bbb',33,'gg',sysdate);

```
