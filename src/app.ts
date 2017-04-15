import {
  AccountCreated,
  AccountDeleted,
  AccountDeletionRequested,
  AccountEvent,
  AccountUpdated,
} from './Events/AccountEvent';

import { AccountEventHandler } from './EventHandlers/AccountEventHandler';
import { MemoryCache } from './Infrastructure/Cache';
import { Account } from './ReadModels/Account';

console.log('Starting...');

// Init
const accountId = 'SomeGuid';
const accountCreated: AccountCreated = { accountId, type: 'ACCOUNT_CREATED' };
accountCreated.accountId = accountId;
const accountUpdated: AccountUpdated = { accountId, type: 'ACCOUNT_UPDATED' };
const accountDeletionRequested: AccountDeletionRequested = { accountId, type: 'ACCOUNT_DELETION_REQUESTED' };
const accountDeleted: AccountDeleted = { accountId, type: 'ACCOUNT_DELETED' };

// Perform manual IoC
const cache = new MemoryCache<Account>();
const eventHandler = new AccountEventHandler(cache);

// Play events
eventHandler.handle(accountCreated);
console.log(cache.Get(accountId));
eventHandler.handle(accountUpdated);
console.log(cache.Get(accountId));
eventHandler.handle(accountDeletionRequested);
console.log(cache.Get(accountId));
eventHandler.handle(accountDeleted);
console.log(cache.Get(accountId));

console.log('Completed!');
