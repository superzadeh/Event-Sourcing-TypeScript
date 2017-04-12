export class Account {
  id: string;
  owner: string;
  createdDate: Date;
  deletedDate: Date;
  isDeleted: boolean;
  isDeletionPending: boolean;
  lastUpdate: Date;
}