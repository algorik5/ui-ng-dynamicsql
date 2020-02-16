declare var defiant;

export class JsonPathUtil {
    //사용법 : let searchs = JsonPathUtil.searchObjects(this.jsonobject,search);
    static searchObjects(object,mypath)//,debugmsgs):any[]//항상 array리턴
    {
        if(object == null) return [];//항상 array 리턴
        //debugmsgs.push("--- searchObjects start # "+ mypath +":"+ object);//JSON.stringify(object));// +":"+ this.searchobject);
        let searchs = defiant.search(object,mypath);//없으면 [] 리턴(무조건 array리턴)
        //debugmsgs.push("--- searchObjects end # "+ searchs);// +":"+ this.searchobject);
        return searchs;
    }

    /////////////////////// test
    static testdata = {
        "car": [
            {"id": 10, "color": "silver", "name": "Volvo"}, {"id": 11, "color": "red",    "name": "Saab"},
            {"id": 12, "color": "red",    "name": "Peugeot"}, {"id": 13, "color": "yellow", "name": "Porsche"}
        ],
        "bike": [ {"id": 20, "color": "black", "name": "Cannondale"}, {"id": 21, "color": "red",   "name": "Shimano"} ]
    };
    static searchTest()
    {
        let searchs = defiant.search(JsonPathUtil.testdata, '//car[color="yellow"]/name');
        //let pkpathdata = JsonPathUtil.searchObjects(JsonPathUtil.testdata,"//*[pk='Y']/path");
        console.log("--- searchTest #searchs="+ JSON.stringify(searchs));

    }
    

    // static searchFields(object,mypath,debugmsgs):any[]//항상 array리턴
    // {
    //   let fields = [];
    //   if(object == null) return fields;

    //   //this.searchobjects = [];
    //   debugmsgs.push("--- searchFields start # "+ mypath +":"+ JSON.stringify(object));
    //   let searchs = defiant.search(object,mypath);//없으면 [] 리턴(무조건 array리턴)
    //   debugmsgs.push("--- searchFields 2 # "+ mypath +":"+ JSON.stringify(searchs));
  
    //   if(searchs != null && searchs.length > 0 && searchs[0] != null)
    //   {
    //     if(searchs[0] == null) return fields;//필드는 있으나 값이 없는 경우 null이 여러개 나옴
    //     if(typeof(searchs[0])!='object') fields.push(searchs[0]);//str,int array이면 첫번째값을 필드로 사용
    //     else fields = Object.keys(searchs[0]);
    //   }
    //   debugmsgs.push("--- searchFields end # "+ JSON.stringify(fields));
    //   return fields;
    // }
  
}
