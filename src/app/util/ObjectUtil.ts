export class ObjectUtil
{
    static values(obj)
    {
        //Object.values(obj);//불가 - 지원되지 않는 브라우저가 경우 있음
        return Object.keys(obj).map(k=>obj[k]);
    }



        //(typescript) JSON format per se doesn't support object references - TypeError: Converting circular structure to JSON
        static stringifyEx (object:any){
            var simpleObject = {};
            for (var prop in object ){
                //alert("--" + prop +" >>> "+ (typeof(object[prop])));
                if (object.hasOwnProperty(prop)==false){ continue; }
                if (Array.isArray(object[prop]) == true){
                    //simpleObject[typeof(object[prop])] = "object---xxx";
                    simpleObject[typeof(object[prop])] = "array---"+ prop +"-"+ object[prop].length;
                    continue;
                }
                if (typeof(object[prop]) == 'object'){
                    //simpleObject[typeof(object[prop])] = "object---xxx";
                    simpleObject[typeof(object[prop])] = "object---"+ prop;
                    continue;
                }
                if (typeof(object[prop]) == 'function'){
                    //simpleObject[typeof(object[prop])] = "function---xxx";
                    simpleObject[typeof(object[prop])] = "function---"+ prop;
                    continue;
                }
                simpleObject[prop] = object[prop];
            }
            return JSON.stringify(simpleObject); // returns cleaned up JSON
        }
}