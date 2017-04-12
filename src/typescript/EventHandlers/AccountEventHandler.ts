import { AccountEvent } from '../Events/AccountEvent';
import { ICache } from '../Infrastructure/Cache';
import { IEventHandler } from './IEventHandler';

export class AccountEventHandler implements IEventHandler<AccountEvent> {
  private cache: ICache<Account>;
  constructor(cache: ICache<Account>) {
    this.cache = cache;
  }
  public handle(event: AccountEvent) {
    const readModel = this.cache.Get(event.accountId);
    switch (event.type) {
      case 'ACCOUNT_CREATED':
        this.cache.Store(readModel.id, readModel);
        break;
      case 'ACCOUNT_UPDATED':
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
