import { injectable } from 'inversify';
import { IReadModel } from './IReadModel';
import { IVersionable } from './IVersionable';

@injectable()
export class Account implements IVersionable, IReadModel {
  public aggregateId: 'ACCOUNT';

  public version: number;
  public lastUpdated: Date;

  public id: string;
  public owner: string;
  public createdDate: Date;
  public deletedDate: Date;
  public isDeleted: boolean;
  public isDeletionPending: boolean;
}
