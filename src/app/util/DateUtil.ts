import { DatePipe } from "@angular/common";

//import * as moment from 'moment';

export class DateUtil
{
    static datePipe = new DatePipe('en-US');
    static dateToString(date:Date,format:string)
    {
          //let date = new Date(2000, 1, 1, 11, 11, i);
          //let datestr = DateUtil.datePipe.transform(date,"yyyy-MM-dd'T'HH:mm:ssZ");//elastic date format - yyyy/MM/dd
        return DateUtil.datePipe.transform(date,format);//elastic date format - yyyy/MM/dd
    }
    static currentDate()
    {
        return new Date();
    }
    static stringToDate(str:string)
    {
        //O(2001-01-01) O(2001/01/01) X(20010101)
        //O(2001-01-01 01:01:01) O(2001-01-01T01:01:01) 
        //return new Date(2000, 1, 1, 11, 11, i);
        return new Date(str);
    }
    static currentDateString()
    {
        return DateUtil.datePipe.transform(new Date(),"yyyy-MM-dd'T'HH:mm:ss");//elastic date format - yyyy/MM/dd
    }
    static currentDateString_mmss()
    {
        return DateUtil.datePipe.transform(new Date(),"mm:ss");//elastic date format - yyyy/MM/dd
    }

    static addDays(date:Date,days:number)
    {
        return new Date(date.getTime() + days*(24*60*60*1000));
    }
    static addSeconds(date:Date,seconds:number)
    {
        return new Date(date.getTime() + seconds*(60*1000));
    }
    static getFirstDayOfMonth(date:Date)
    {
        let newdate = new Date(date);
        newdate.setDate(1);
        return newdate;
    }
    static getLastDayOfMonth(date:Date)
    {
        let newdate = new Date(date);
        newdate.setMonth(date.getMonth() + 1)
        newdate.setDate(1);
        newdate.setDate(newdate.getDate() - 1);
        return newdate;
    }

    //https://alligator.io/js/date-object/

    // static stringToDate(str:string)
    // {
    //     //new Date("2010/01/01")
    //     //new Date(2000, 5, 20, 16, 34, 12, 24);
    //     //new Date(4000000000);
    //     //return new Date(str);
    //     //return new Date(str);
    //     //return moment("20111031", "YYYYMMDD");
    //     return moment(str, "YYYY-MM-DD");
    // }
    // static dateToString(date:Date)
    // {
    //     return date.toLocaleDateString();
    //     //return date.toDateString("yyyy-MM-dd")
    // }

    // static addStringDays(str: string, days: number): string 
    // {
    //     const date = moment(str, "YYYY-MM-DD").add(days, 'days');
    //     return moment(date).format("YYYY-MM-DD");
    // }
    // static addDateDays(date: Date, days: number): Date 
    // {
    //     date.setDate(date.getDate() + days);
    //     return date;
    // }

}