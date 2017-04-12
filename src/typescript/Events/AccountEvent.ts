
import { EventBase } from './EventBase';

export abstract class AccountEventBase extends EventBase {
  public accountId: string;
}
export class AccountCreated extends AccountEventBase {
  public type: 'ACCOUNT_CREATED';
  public owner: string;
  public creationDate: Date;
}
export class AccountUpdated extends AccountEventBase {
  public type: 'ACCOUNT_UPDATED';
  public newOwner: string;
  public updatedDate: Date;
}
export class AccountDeletionRequested extends AccountEventBase {
  public type: 'ACCOUNT_DELETION_REQUESTED';
  public requestedBy: string;
}
export class AccountDeleted extends AccountEventBase {
  public type: 'ACCOUNT_DELETED';
  public deletionDate: Date;
}

export type AccountEvent = AccountCreated | AccountUpdated | AccountDeletionRequested | AccountDeleted;
