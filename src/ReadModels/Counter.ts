import { injectable } from 'inversify';
import { IReadModel } from './IReadModel';

@injectable()
export class Counter implements IReadModel {
  public aggregateId: 'COUNTER';

  public version: number;
  public lastUpdated: Date;

  public id: string;
  public value: number;
  public numberOfTimesIncremented: number;
  public numberOfTimesDecremented: number;
  public numberOfTimesReset: number;
}
