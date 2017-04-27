
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

export type CounterEvent = CounterIncremented | CounterDecremented;
