
import { EventBase } from './EventBase';

export interface AccountEventBase extends EventBase {
  accountId: string;
}
export interface AccountCreated extends AccountEventBase {
  owner?: string;
  creationDate?: Date;
  type: 'ACCOUNT_CREATED';
}
export interface AccountUpdated extends AccountEventBase {
  newOwner?: string;
  updatedDate?: Date;
  type: 'ACCOUNT_UPDATED';
}
export interface AccountDeletionRequested extends AccountEventBase {
  requestedBy?: string;
  type: 'ACCOUNT_DELETION_REQUESTED';
}
export interface AccountDeleted extends AccountEventBase {
  deletionDate?: Date;
  type: 'ACCOUNT_DELETED';
}

export type AccountEvent = AccountCreated | AccountUpdated | AccountDeletionRequested | AccountDeleted;
