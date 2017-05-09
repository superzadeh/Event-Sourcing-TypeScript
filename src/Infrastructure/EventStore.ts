// tslint:disable-next-line:no-var-requires
const es: any = require('eventstore');

export interface EventStreamOptions {
  aggregateId: string;
  aggregate: string; // optional
  context: string; // optional
}
export interface Snapshot {
  data: any;
}
export interface Stream {
  events: any[];
}
export interface IEventStore {
  start(callback: () => void): void;

  getEvents(query: string | EventStreamOptions, callback: (err: any, events: any[]) => void): void;
  getFromSnapshot(
    query: string | EventStreamOptions,
    callback: (err: any, snapshot: Snapshot, stream: Stream) => void): void;
}

export class EventStoreClient implements IEventStore {
  private es: any;

  public constructor() {
    this.es = es({
      type: 'redis',
      host: 'localhost',                          // optional
      port: 6379,                                 // optional
      db: 0,                                      // optional
      prefix: 'eventstore',                       // optional
      eventsCollectionName: 'events',             // optional
      snapshotsCollectionName: 'snapshots',       // optional
      timeout: 10000,                             // optional
      // maxSnapshotsCount: 3                     // optional, default will keep all snapshots
      // password: 'secret'                       // optional
    });
  }
  public start(callback: () => void): void {
    es.init();
  }
  public getEvents(query: string | EventStreamOptions, callback: (err: any, events: any[]) => void): void {
    es.getEventStream(query, callback);
  }
  public getFromSnapshot(
    query: string | EventStreamOptions,
    callback: (err: any, snapshot: Snapshot, stream: Stream) => void): void {

    es.getFromSnapshot(query, callback);
  }
}
