import {
  Injectable
} from '@angular/core';
import {
  Observable,
  of,
  BehaviorSubject,
  Subject
} from 'rxjs';
import { Message } from '../core.model';
//import { Message } from 'primeng/api';


@Injectable()
export class MessageHandler {
  public message =  new Subject<Message>();
  private data : Message;
  setEntityValue(msg : Message){
    this.message.next(msg);
  }

  getEntityValue(){
   return this.message.asObservable();
  }

  setSuccess(msg : string){
    this.data = { message : msg, severity : 'success' };
    this.message.next(this.data);
  }
  setFailure(msg : string){
    this.data = { message : msg, severity : 'error' };
    this.message.next(this.data);
  }
}
