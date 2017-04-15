import { AccountCreated, AccountEvent } from '../Events/AccountEvent';
import { ICache } from '../Infrastructure/Cache';
import { Account } from '../ReadModels/Account';
import { IEventHandler } from './IEventHandler';

export class AccountEventHandler implements IEventHandler<AccountEvent> {
  private cache: ICache<Account>;
  constructor(cache: ICache<Account>) {
    this.cache = cache;
  }
  public handle(event: AccountEvent) {
    let readModel = this.cache.Get(event.accountId);
    switch (event.type) {
      case 'ACCOUNT_CREATED':
        readModel = new Account();
        readModel.id = event.accountId;
        readModel.owner = event.owner;
        this.cache.Store(readModel.id, readModel);
        break;
      case 'ACCOUNT_UPDATED':
        readModel.lastUpdate = event.timestamp;
        readModel.owner = event.newOwner;
        this.cache.Store(readModel.id, readModel);
        break;
      case 'ACCOUNT_DELETION_REQUESTED':
        break;
      case 'ACCOUNT_DELETED':
        this.cache.Remove(readModel.id);
        break;
    }
  }
}
