
# sboot 
- listen(consumer<string> con)... onmsg...consumer.accept(msg.get...
- format : gap/total/elapse ...

# stomp ts
- 추가포팅 - substart/stop/started

# scss
- scss - $feayure-flags ....
- scss  - i3tm - height 500 (테이블이 커지면서 겹쳐짐)

# JSON.stringyfy
- ~ angular.json  - scripts ... flatted/min.js

# ngx-json-viewer
- html ~  <ngx-json-viewer ...  
- ts
  - debugobject;   
  - setdebug(obj) { this.debugobject = obj}   
  - ...subscribe(res=>setdebug(res),err=>setdebug...
- 모든 catch ... setdebug ~모든 click에 try,catch추가

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
