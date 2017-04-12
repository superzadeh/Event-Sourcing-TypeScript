import {
  AccountEvent,
  AccountCreated,
  AccountUpdated,
  AccountDeletionRequested,
  AccountDeleted
} from "./Events/AccountEvent";

import { MemoryCache } from "./Infrastructure/Cache";
import { Account } from "./ReadModels/Account";
import { AccountEventHandler } from "./EventHandlers/AccountEventHandler";

console.log("Starting...");

// Init
const accountId = "SomeGuid";
const accountCreated = new AccountCreated();
accountCreated.accountId = accountId;
const accountUpdated = new AccountUpdated();
const accountDeletionRequested = new AccountDeletionRequested();
const accountDeleted = new AccountDeleted();

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


