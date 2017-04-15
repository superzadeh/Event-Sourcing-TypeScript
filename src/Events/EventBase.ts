export abstract class EventBase {
  public id: string;
  public aggregateId: string;
  public timestamp: Date;
  public abstract type: string;
}
