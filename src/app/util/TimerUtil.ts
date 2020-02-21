import { timer } from 'rxjs';

export class TimerUtil
{
    static createTimer()
    {
        //rxjs timer - mytimer=timer(1000,10000); mytimer.subscribe(count=>alert...
        let mytimer = timer(1000,1000);
        mytimer.suscribe(count=>{
            console.log("======== mytimer # "+ count);
        });

    }
}