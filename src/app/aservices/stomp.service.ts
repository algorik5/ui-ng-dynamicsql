import { Injectable } from '@angular/core';
import {RxStomp} from '@stomp/rx-stomp';
import { LogService } from './log.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StompService {

  constructor(private log:LogService) { }

  consoledebug = false;
  stompConfig = {
    connectHeaders: {
      login: "guest",
      passcode: "guest"
    },
    brokerURL: "ws://localhost:18080/websocket",
    debug: function (str) {
      if(this.consoledebug == true) console.log('### STOMP debug : ' + str);
    },
    reconnectDelay: 1000,// auto reconnect
  };

  rxStomp:RxStomp;
  connect(wsUrl) {
    if(this.isConnected()) 
    {
      this.log.info("***** connect connected # "+ this.stompConfig.brokerURL);
      return;
    }
    this.stompConfig.brokerURL = wsUrl;
    this.log.info("connect start # "+ this.stompConfig.brokerURL);
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(this.stompConfig);
    this.rxStomp.activate();//connect
    this.log.info("connect activate #connected="+ this.rxStomp.connected);

    //this.subError();
    //this.subReply();
  }
  disconnect()
  {
    this.log.info("disconnect start # "+ this.stompConfig.brokerURL);
    this.rxStomp.deactivate();
    this.log.info("disconnect deactivate #connected="+ this.rxStomp.connected);
  }
  isConnected() { 
    if(this.rxStomp == null) return false;
    if(this.rxStomp.connected()) return true;
    return false;
  }

  //////////////////////// pub
  pub(topic:string,data) {
    this.log.info("*** pub # "+ topic +":"+ data);
    //let data = {"id":"id-"+ this.no,"name" : "kwak-"+this.no };
    this.rxStomp.publish({destination: topic, body: JSON.stringify(data)});
  }

  //////////////////////// sub
  sub(topic):Observable<any>
  {
    this.log.info("*** sub start # "+ topic);
    // this.subscribeO = this.rxStomp.watch(mytopic)
    // .subscribe((payload) => {
    //   //alert("/topic/reply # "+ payload.body);
    //   this.logging.info("*** RECV # "+ mytopic +"]"+ payload.body);
    // });
    return this.rxStomp.watch(topic);
  }  
}
