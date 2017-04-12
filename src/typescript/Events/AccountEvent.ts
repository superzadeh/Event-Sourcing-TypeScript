
import { EventBase } from "./EventBase";

export abstract class AccountEventBase extends EventBase {
  accountId: string;
}
export class AccountCreated extends AccountEventBase {
  type: 'ACCOUNT_CREATED';
  owner: string;
  creationDate: Date;
}
export class AccountUpdated extends AccountEventBase {
  type: 'ACCOUNT_UPDATED';
  newOwner: string;
  updatedDate: Date;
}
export class AccountDeletionRequested extends AccountEventBase {
  type: 'ACCOUNT_DELETION_REQUESTED';
  requestedBy: string;
}
export class AccountDeleted extends AccountEventBase {
  type: 'ACCOUNT_DELETED';
  deletionDate: Date;
}

export type AccountEvent = AccountCreated | AccountUpdated | AccountDeletionRequested | AccountDeleted;