import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  debug(msg)
  {
    console.log("===debug # "+ msg)
  }
  info(msg)
  {
    console.log("===info # "+ msg)
  }
  warn(msg)
  {
    alert("===warn # "+ msg)
  }
  error(msg)
  {
    alert("===error # "+ msg)
  }
}
