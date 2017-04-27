
import { EventBase } from './EventBase';

export interface CounterEventBase extends EventBase {
  timestamp: Date;
}
export interface CounterIncremented extends CounterEventBase {
  owner?: string;
  creationDate?: Date;
  type: 'COUNTER_INCREMENTED';
}
export interface CounterDecremented extends CounterEventBase {
  newOwner?: string;
  updatedDate?: Date;
  type: 'COUNTER_DECREMENTED';
}
export interface CounterReset extends CounterEventBase {
  type: 'COUNTER_RESET';
}

export type CounterEvent = CounterIncremented | CounterDecremented | CounterReset;
