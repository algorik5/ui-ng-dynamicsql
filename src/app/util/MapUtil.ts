export class MapUtil
{
    ///////////////////// map.service로 이동

    // static keysToArray(map:Map<any,any>) { return Array.from(map.keys()); }
    // static valuesToArray(map:Map<any,any>) { return Array.from(map.values()); }

    static createMap():Map<string,number>
    {
        let mymap:Map<string,number> = new Map();
        //let mymap = new Map();
        //map.set("a",1); map.get("a"); map.has("A"); map.delete("A");
        
        //X-for (let key of map.keys()) { console.log(key); }
        //X-for (let value of map.values()) { console.log(value); }
        //X-for (let entry of map.entries()) { console.log(entry[0], entry[1]); }
        //X-for (let [key, value] of map.entries()) { console.log(key, value); }
        //X-for (let [key, value] of map) { console.log(key, value); }
        //X-for (const [key, value] of mymap) { console.log(`${key} = ${value}`);  }

        //OK-mymap.forEach((value, key) => { console.log(`${key} = ${value}`); }, mymap); 

        return mymap;
    }
}