export interface IMessageQueue<T> {
  Publish(key: string, message: T): void;
}
export interface ISubscriber<T> {
  Subscribe(topic: string): void;
  Unsubscribe(topic: string): void;
}
