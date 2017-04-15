
import { EventBase } from './EventBase';

export abstract class AccountEventBase extends EventBase {
  public accountId: string;
}
export class AccountCreated extends AccountEventBase {
  public owner: string;
  public creationDate: Date;
  public type: 'ACCOUNT_CREATED';
}
export class AccountUpdated extends AccountEventBase {
  public newOwner: string;
  public updatedDate: Date;
  public type: 'ACCOUNT_UPDATED';
}
export class AccountDeletionRequested extends AccountEventBase {
  public requestedBy: string;
  public type: 'ACCOUNT_DELETION_REQUESTED';
}
export class AccountDeleted extends AccountEventBase {
  public deletionDate: Date;
  public type: 'ACCOUNT_DELETED';
}

export type AccountEvent = AccountCreated | AccountUpdated | AccountDeletionRequested | AccountDeleted;
