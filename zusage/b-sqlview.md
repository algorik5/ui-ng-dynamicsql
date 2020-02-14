

# test data
```
CREATE TABLE "PERSONS"
 (	
    "NAME" VARCHAR2(20 BYTE) primary key,
	"NATION" VARCHAR2(20 BYTE), 
	"CITY" VARCHAR2(20 BYTE), 
	"ADDRESS" VARCHAR2(20 BYTE), 
	"AGE" NUMBER(10,0), 
	"COMPANY" VARCHAR2(20 BYTE), 
	"TIME" DATE
 )

Insert into PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aaa','korea','seoul','xxx',569,'ggg',sysdate);
Insert into PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aa1','korea','seoul','xx1',787,'gg1',sysdate);
Insert into PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aa2','korea','inchen','xx2',22,'gg2',sysdate);
Insert into PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('aa3','korea','busan','xx3',33,'gg',sysdate);
Insert into PERSONS (NAME,NATION,CITY,ADDRESS,AGE,COMPANY,TIME) values ('bbb','us','newyork','bbb',33,'gg',sysdate);
```

# test data - server
```
CREATE TABLE SERVER
 (	
    "HOST" VARCHAR2(20),
	"CPU" NUMBER(10,0), 
	"MEMORY" NUMBER(10,0),
	"TIME" DATE,
	primary key (host,time)
 )

Insert into SERVER (HOST,CPU,MEMORY,TIME) values ('host-1',10.0,15.0,'2020-01-01');
Insert into SERVER (HOST,CPU,MEMORY,TIME) values ('host-1',11.0,15.0,'2020-01-02');
Insert into SERVER (HOST,CPU,MEMORY,TIME) values ('host-1',12.0,15.0,'2020-01-03');

Insert into SERVER (HOST,CPU,MEMORY,TIME) values ('host-2',20.0,25.0,'2020-01-01');
Insert into SERVER (HOST,CPU,MEMORY,TIME) values ('host-2',21.0,25.0,'2020-01-02');
Insert into SERVER (HOST,CPU,MEMORY,TIME) values ('host-2',22.0,25.0,'2020-01-03');

```

