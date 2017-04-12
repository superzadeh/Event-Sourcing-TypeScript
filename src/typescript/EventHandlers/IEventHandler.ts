import { EventBase } from "../Events/EventBase";

export interface IEventHandler<T extends EventBase> {
  handle(event: T): void
}