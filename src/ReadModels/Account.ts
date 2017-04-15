import { IVersionable } from './IVersionable';

export class Account implements IVersionable {
  public version: number;
  public lastUpdated: Date;

  public id: string;
  public owner: string;
  public createdDate: Date;
  public deletedDate: Date;
  public isDeleted: boolean;
  public isDeletionPending: boolean;
}
