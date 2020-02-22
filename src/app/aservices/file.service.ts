import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import serverjson from 'src/assets/table_mapping/server.json';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class FileService {

  constructor(private http: HttpClient) { }

  //////////////////////////// import
  /*
    src/assets/table_mapping/server.json : server.json 생성
    tsconfig.json - {  "compilerOptions": {  "resolveJsonModule": true, "esModuleInterop": true } }
    import serverjson from 'src/assets/table_mapping/server.json';
    console.log("file==="+ JSON.stringyfy(serverjson))
  */
  read_serverjson()
  {
    return serverjson;
  }

  //////////////////////////// http
  /*
    주의 : service에 HttpClient를 사용하려면 app.module.ts에 HttpClientModule에 등록해야 함
    1. private file:FileService
    2. file.read("assets/table_mapping/server.json")
      .subscribe((filedata) => console.log("====FILE read  # "+ JSON.stringify(filedata)));
  */
  read(fullfilename)
  {
    return this.http.get(fullfilename);//"assets/table_mapping/server.json")
    //.subscribe((filedata) => console.log("====FILE read  # "+ JSON.stringify(filedata))); 
  }

  // write(fullfilename)//////////// 불가능 - http write 불가능
  // {
  //   const httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json' }) };
  //   this.http.post("assets/table_mapping/server1.json",this.jsonObject,httpOptions)
  //   .subscribe(filedata => console.log("====FILE write # "+ JSON.stringify(data)));
  // }
}
