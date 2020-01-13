import { BankingOidFactory } from './banking/banking.factory';
import { OidFactory } from './oid-factory.interface';
import { CheckdigitOidFactory } from './checkdigit/checkdigit.factory';
import * as xxhash from 'xxhash';
import {
  ScopeRegistrationError,
  UnregisteredScopeError,
  MalformedOidError
} from './../errors/index';
import { ScopeTypes } from './types';
import { CheckdigitScopes, AlphaHashidScopes, BankingScopeNames } from './scopes.enum';
import { fromBase64 } from '../util';
export class Scope {
  constructor(public key: string | number, public name: string, public type: ScopeTypes) {}
}

class ScopeRegistry {
  private readonly hashIdRegEx = /^(.+)_([a-z0-9]+)/;
  private registeredByKey: Map<string | number, string> = new Map<string | number, string>();
  private registeredByScopename: Map<string, string | number> = new Map<string, string | number>();
  private scopeKeyToFactoryMap: Map<string, OidFactory> = new Map<string, OidFactory>();

  getScopeType(scopename: string): ScopeTypes {
    if (Reflect.get(AlphaHashidScopes, scopename) || Reflect.get(CheckdigitScopes, scopename)) {
      return ScopeTypes.CHECKDIGIT;
    }

    if (Reflect.get(BankingScopeNames, scopename)) {
      return ScopeTypes.BANKING;
    }

    return ScopeTypes.EXPERIMENTAL;
  }

  getScopename(key: string | number): string {
    const scopename = this.registeredByKey.get(key);
    if (!scopename) {
      throw new UnregisteredScopeError(`key ${key} is not registered`);
    }
    return scopename;
  }

  getKey(scopename: string): string | number {
    const key = this.registeredByScopename.get(scopename);
    if (!key) {
      throw new UnregisteredScopeError(`scope ${scopename} not registered`);
    }
    return key;
  }

  // tslint:disable-next-line: no-empty
  constructor() {}

  getFactoryByScopename(scopename: string): OidFactory {
    const type = this.getScopeType(scopename);
    switch (type) {
      case ScopeTypes.BANKING:
        return new BankingOidFactory(this);
      case ScopeTypes.EXPERIMENTAL:
      case ScopeTypes.CHECKDIGIT:
        return new CheckdigitOidFactory(this);
    }
  }

  getFactoryByOidString(oid_string: string): OidFactory {
    if (oid_string[0] === `~`) {
      return new BankingOidFactory(this);
    }
    const matches = this.hashIdRegEx.exec(oid_string);
    if (!matches || (matches && matches.length !== 3)) {
      try {
        const { key } = JSON.parse(fromBase64(oid_string));
        // tslint:disable-next-line no-shadowed-variable
        const factory = this.scopeKeyToFactoryMap.get(key);
        if (!factory) {
          throw Error('No Factory Found');
        }
        return factory;
      } catch (e) {
        throw new MalformedOidError(`Malformed tilde oid format: ${oid_string}`);
      }
    }
    const [, prefix] = matches;

    const factory = this.scopeKeyToFactoryMap.get(prefix) || new CheckdigitOidFactory(this);
    return factory;
  }

  register(scopename: string, shortcode?: string): Scope {
    const registeredKey = this.registeredByScopename.get(scopename);

    if (registeredKey && shortcode && registeredKey !== shortcode) {
      throw new ScopeRegistrationError(
        `Cannot reregister Scope:${scopename} has already been registered under shortcode:${shortcode}`
      );
    }
    const type = this.getScopeType(scopename);
    switch (type) {
      case ScopeTypes.EXPERIMENTAL:
      case ScopeTypes.CHECKDIGIT:
        if (!shortcode) {
          throw new ScopeRegistrationError('Oids must declare their shortcode');
        }
        this.registeredByScopename.set(scopename, shortcode);
        this.registeredByKey.set(shortcode, scopename);
        this.scopeKeyToFactoryMap.set(shortcode, new CheckdigitOidFactory(this));
        return new Scope(shortcode, scopename, type);
      case ScopeTypes.BANKING:
        const key = xxhash.hash(Buffer.from(scopename), 0xcafecafe);
        this.registeredByScopename.set(scopename, key);
        this.registeredByKey.set(key, scopename);
        this.scopeKeyToFactoryMap.set(key, new BankingOidFactory(this));
        return new Scope(key, scopename, type);
    }
  }

  resetRegistery() {
    this.registeredByKey = new Map<string | number, string>();
    this.registeredByScopename = new Map<string, string | number>();
  }
}
export const scopeRegistry = new ScopeRegistry();
