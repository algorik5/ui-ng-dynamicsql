import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

export class ArrayUtil
{
    // static zzz_arrayToObject(obj)//아직 테스트안함
    // {
    //     //~ array to object - object.keys.foreach...o[v]=v (기타-object.assign)
    //     //return Object.keys(obj).forEach(o=>o[v]=v); 
    // }
    static zzz_foreach(arr) { arr.forEach((o,index)=>{}); }

    static addFirst(arr,str) { 
        //array 맨앞에 넣기 - ["first"].concat(arr)
        return [str].concat(arr);
    }

    static removeDup(arr):any[] { return Array.from(new Set(arr)); }
    
    static sort(arr) { arr.sort(); }//주의 - 리턴값 아님  -그냥 호출하면 sort됨
    static sortstring(arr) { arr.sort((old,cur)=>Number(cur)-Number(old)); }
    static groupby(arr) 
    {
        //reduce로 테스트 
    }
    //[1,3,2]
    static topN(arr,top):any[] { return arr.sort((old,cur)=>cur-old).slice(0,top); }
    //[{a:1},{b:3},{c:2}] 값으로 sort + top
    static topNvalue(arr,top,valueindex):any[] { return arr.sort((old,cur)=>cur[valueindex]-old[valueindex]).slice(0,top); }

    static objectToArray(obj):any[] 
    { 
        //return Array.from(obj);
        //return [...arr]
        return (<any[]>obj); 
    }

    static contains() {
        let arr = [1,2,3];
        return arr.includes(10);
    }

    static test_isArray()
    {
        let b = Array.isArray([1,2,3]);
    }

    static testSearch()
    {
        let jsonstr:string = "datedatas\": [ { \"time\": \"2001\", \"count\": 2 }, { \"time\": \"2001\", \"count\": 1 } ]";
        let jsonobj:any = JSON.parse(jsonstr);

        //OK - array 리턴 >>> 
        //let search1 = jsonobj.series.filter(x => x.time == "2001");//배열
        //NO - 에러
        //let search2 = jsonobj.series.filter(x => x.time == "2001").time;

        //OK - 1개만(첫번쨰) 리턴 >>> 
        let search1 = jsonobj.series.find(x => x.time == "2001");//1개
        //OK - 값 
        let search2 = jsonobj.series.find(x => x.time == "2001").time;//1개
    }

    static testPush()
    {
        let sliders: Array<any> = []; 

        sliders.push({id:"id-11" ,name:"name-11" }); 
        sliders.push({id:"id-21" ,name:"name-21" }, { id:"id-22" ,name:"name-22" }); 
    }
    static testRemove()
    {
        let datas = [
            { id: 1, name: 'aaa',value:10 }
            ,{ id: 2, name: 'bbb',value:20 }
            ,{ id: 3, name: 'aaa',value:30 }
            ,{ id: 1, name: 'aaa',value:10 }
        ];
        datas = datas.filter(o=>o.name!="aaa");//삭제
    }


    //map(배열만큼 리턴) reduce(1개만 리턴)
    static testArray():void
    {
        let datas = [
            { id: 1, name: 'aaa',value:10 }
            ,{ id: 2, name: 'bbb',value:20 }
            ,{ id: 3, name: 'aaa',value:30 }
            ,{ id: 1, name: 'aaa',value:10 }
        ];

        let ids = []; let objs = [];

        //////////////////////////// ts
        ids = []; objs = [];
        //forEach 
        datas.forEach((obj) => { if(obj.name=="aaa") ids.push(obj.id); });
        console.log('--- forEach  # '+ ids);//[1,3,4]
        datas.forEach((obj) => { if(obj.name=="aaa") objs.push(obj); });
        console.log('--- forEach  # '+ "#objs="+JSON.stringify(objs));//#length=2#id=1#name=aaa
        
        //map > 리턴값 정의 가능 >>> 항상 배열 갯수 만큼 리턴(조건이 안맞는 obj은 null 채워서 리턴)
        ids = []; objs = [];
        ids = datas.map(obj => { if(obj.name=="aaa") return obj.id });
        console.log('--- map      # '+ ids);//[1,,3,4]
        objs = datas.map(obj => { if(obj.name=="aaa") return obj; });
        console.log('--- map      # '+ "#objs="+JSON.stringify(objs));//#length=2#id=1#name=aaa
        objs = datas.map(obj => ({ time:obj["id"],age:obj["name"] }));
        console.log('--- map      # '+ "#objs="+JSON.stringify(objs));//멀티 필드 리턴
        objs = datas.map(obj => ({ time:obj.id,age:obj.name }));
        console.log('--- map      # '+ "#objs="+JSON.stringify(objs));//멀티 필드 리턴
        //필드없으면 안됨 > objs = datas.map(obj => ({ obj.id,obj.name }));

        //filter > true/false리턴 > object array 리턴
        objs = [];
        objs = datas.filter(obj => { if(obj.name == "aaa") return true } );
        console.log('--- filter   # '+ "#objs="+JSON.stringify(objs));//#length=2#id=1#name=aaa
        objs = [];
        objs = datas.filter((obj,index,result) => { if(obj.name == "aaa") return true } );
        console.log('--- filter2  # '+ "#objs="+JSON.stringify(objs));//#length=2#id=1#name=aaa

        //find > 첫번째 object만 리턴 (datas를 any로 선언해야 함)
        let obj = datas.find(obj => { if(obj.name == "aaa") return true } );
        console.log('--- find     # '+ "#obj="+JSON.stringify(obj));//#length=2#id=1#name=aaa

        //reduce > number 리턴 > 10
        ids = []; objs = [];
        let sum = datas.reduce((sum, obj) => { return sum + obj.id; }, 0);
        console.log('--- reduce   # '+ sum);//10

        //동시에 사용
        let complex = datas
            .filter(obj => obj.name=="aaa")//aaa만 추출
            .map(obj => obj.id + obj.value)//id+value 계산값만 추출
            .reduce((acc, obj) => acc + obj, 0);//sum
        console.log('--- complex  # '+ complex);//44



        // 중복제거 - map + filter (id만 추출 후 동일 id skip)
        let distinctIds = datas.map(obj=>obj.id).filter((obj, index, array) => array.indexOf(obj) == index);
        //includes는 es7에서 지원 > let distinctIds = datas.map(obj=>obj.id).filter((obj, index, result) => result.includes(obj));
        // 중복제거 - foreach
        //let distinctIds = []; datas.forEach((obj) => { if (!distinctIds.includes(obj.id)) distinctIds.push(obj.id);});
        //중복제거 - Set
        //let distinctIds = Array.from(new Set(datas.map((item: any) => item.id)))
 
        //sort
        // distinctIds.sort();
        // datas.sort((a,b)=>a.name>b.name);

        //또는 lodash ... groupby,keyby...

        //
        //////////////////////////// rxjs operator > groupby ...
    }
    addArrayTest()
    {
        let ids = [1,2,3];
        let temps = [10,20,30];
        ids = ids.concat(temps);//return값이 add된 것임

        ids.push(...temps);//ES6
        ids.push.apply(ids, temps);
    }
}


//////////////////////////// main test (tsc ArrayUtil > node ArrayUtil)
//  console.log('---------------- start');
//  ArrayUtil.testArray();
//  console.log('---------------- end');

