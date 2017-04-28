import { EventBase } from '../Events/EventBase';

export interface IEventHandler<T extends EventBase> {
  start(): void;
  stop(): void;
  handle(event: T): void;
}
