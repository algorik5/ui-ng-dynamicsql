export class JsonUtil
{
    static pretty(obj)
    {
        let str = JSON.stringify(obj,null,2);
        console.log('--------- str # '+ str);
    }

}