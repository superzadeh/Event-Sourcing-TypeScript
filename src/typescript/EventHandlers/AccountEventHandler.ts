import { IEventHandler } from "./IEventHandler";
import { AccountEvent } from "../Events/AccountEvent";
import { ICache } from "../Infrastructure/Cache";

export class AccountEventHandler implements IEventHandler<AccountEvent> {
  private _cache: ICache<Account>;
  constructor(cache: ICache<Account>) {
    this._cache = cache;
  }
  handle(event: AccountEvent) {
    var readModel = this._cache.Get(event.accountId);
    switch (event.type) {
      case "ACCOUNT_CREATED":
        this._cache.Store(readModel.id, readModel);
        break;
      case "ACCOUNT_UPDATED":
        this._cache.Store(readModel.id, readModel);
        break;
      case "ACCOUNT_DELETION_REQUESTED":
        break;
      case "ACCOUNT_DELETED":
        this._cache.Remove(readModel.id);
        break;
    }
  }
}