import {IAppEvent, IEventEmitter, IMediator} from "./interfaces";
export class EventEmitter implements IEventEmitter {
   protected mediator: IMediator;
   protected events: Array<IAppEvent>;

   constructor(mediator: IMediator) {
     this.mediator = mediator;
   }

   public triggerEvent(event: IAppEvent) {
     this.mediator.publish(event);
   }

   public subscribeToEvents(events: Array<IAppEvent>) {
     this.events = events;
     for (let i = 0; i < this.events.length; i++) {
       this.mediator.subscribe(this.events[i]);
     }
   }

   public unsubscribeToEvents() {
     for (let i = 0; i < this.events.length; i++) {
       this.mediator.unsubscribe(this.events[i]);
     }
   }
 }
