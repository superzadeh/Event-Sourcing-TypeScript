export abstract class EventBase {
  id: string;
  aggregateId: string;
  timestamp: Date;
  abstract type: string;
}