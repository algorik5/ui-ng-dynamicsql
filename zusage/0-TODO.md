



======================== stomp insert
left : sub,msgtype,tablelist
right : 

msg to alasql

















--------- ng9은 나중에 - carbon-v9이 아직 2.x버젼

--샘플 테이블/데이터 - swagger>makesampledata
    server  host/time/cpu/mem
    process process/args/host/cpu/time
--이슈 - Flatted.stringify(k2) <<< 항상 최상위를 출력하는군
	--- 다른방안





# sboot 
- listen(consumer<string> con)... onmsg...consumer.accept(msg.get...

# stomp ts
- 추가포팅 - substart/stop/started

# scss
- scss - $feayure-flags ....
- scss  - i3tm - height 500 (테이블이 커지면서 겹쳐짐)


- ...subscribe(res=>setdebug(res),err=>setdebug...
- 모든 catch ... setdebug ~모든 click에 try,catch추가
- codepen/codesandbox 

# carbon form
- ng form그대로 사용
- constructor(formbuilder...  
- this.formgroup = formbuilder.group({id1:['',validators.required...  
- this.formgroup.value['id1]  
- this.formgroup.patchvalue/setvakue,reset  
- object.keys(this.formgroup.controls)

~~~ form html  
- &nbsp; <button ... topiccreate ..  
- <form [formgroup]=formgroup size=sm>  
- <ng-container ngfor=let name of getformnames();let i = index>  
- <ibm-label...  
- <label ...>{{name}}...  
- <input ... formcontrolname={{name}} value={{formgroup.value[name]}}>  
- .. </form>  - <div> <ngx-json-viewer...

~~~ form ts
- constructor...protected formbuiler ... initform()..
- formgroup:FormGroup
- initform(..) { this.formgroup=this.formbuiler.group({});
- setformcontrol().. tablemodel.header.foreach(o=>this.formgroup.addcontrol(o.data,new formcontrol('',valdidator.required)} 
--- 데엍가져왔을때 호출
- setformdata(selectdata) { object.keys.foreach(o=>this.formgrouo.value[o] = sectdata[o] 
--- row선택시 호출
- getformnames() { object.keys(formgroup.controls)
- clicktablerow ... for(let i=0;i<header.length;i++) this.selectdata[header[i]] = data[i]...this.setformdata()
