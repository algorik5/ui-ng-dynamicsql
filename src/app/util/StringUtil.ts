export class StringUtil
{
  static startsWith(str) { return str.startsWith("XXX"); }
  static contains(str:string) { return str.includes("XXX"); }
  static replace(str:string) { return str.replace("XXX",""); }
  static replaceAll(str:string,oldstr,newstr) 
  { 
    return str.split(oldstr).join(newstr); //return str.split('/').join('X'); 
    //return str.replace(new RegExp(oldstr), newstr);
    //return str.replace(/oldstr/g, newstr)
    //특수문자 : replace(/\//g, '-');
  }
}


//////////////////////////// main test (tsc ArrayUtil > node ArrayUtil)
// console.log('---------------- start');
// console.log('---------------- '+ StringUtil.startsWith("aaaa"));
// console.log('---------------- end');

