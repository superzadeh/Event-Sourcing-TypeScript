export class Account {
  public id: string;
  public owner: string;
  public createdDate: Date;
  public deletedDate: Date;
  public isDeleted: boolean;
  public isDeletionPending: boolean;
  public lastUpdate: Date;
}
