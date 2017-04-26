import { IVersionable } from './IVersionable';

export interface IReadModel extends IVersionable {
  aggregateId: string;
}
