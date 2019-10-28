import { ScopeRegistrationError, UnregisteredScopeError } from './../errors/index';
import * as xxhash from 'xxhash';
import { ScopeTypes } from './types';
import { Scopes, NoCheckdigitArbiterScopes, AlphaHashidScopes, TildeScopeNames } from './scopes';

export class ScopeRegistry {
  static ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  static readonly hashIdRegEx = /^(.+)_([a-z0-9]+)/;
  private static registeredByKey: Map<string | number, string> = new Map<string | number, string>();
  private static registeredByScopename: Map<string, string | number> = new Map<
    string,
    string | number
  >();

  static GetScopeType(scopename: string): ScopeTypes {
    if (
      Reflect.get(AlphaHashidScopes, scopename) ||
      Reflect.get(NoCheckdigitArbiterScopes, scopename) ||
      Reflect.get(Scopes, scopename)
    ) {
      return ScopeTypes.CHECKDIGIT;
    }

    if (Reflect.get(TildeScopeNames, scopename)) {
      return ScopeTypes.TILDE;
    }

    return ScopeTypes.EXPERIMENTAL;
  }

  static GetScopename(key: string | number): string {
    const scopename = this.registeredByKey.get(key);
    if (!scopename) {
      throw new UnregisteredScopeError(`key ${key} is not registered`);
    }
    return scopename;
  }

  static GetKey(scopename: string): string | number {
    const key = this.registeredByScopename.get(scopename);
    if (!key) {
      throw new UnregisteredScopeError(`scope ${scopename} not registered`);
    }
    return key;
  }

  register(scopename: string, shortcode?: string): string | number {
    const registeredKey = ScopeRegistry.registeredByScopename.get(scopename);

    if (registeredKey && shortcode && registeredKey !== shortcode) {
      throw new ScopeRegistrationError(
        `Cannot reregister Scope:${scopename} has already been registered under shortcode:${shortcode}`
      );
    }
    switch (ScopeRegistry.GetScopeType(scopename)) {
      case ScopeTypes.EXPERIMENTAL:
      case ScopeTypes.CHECKDIGIT:
        if (!shortcode) {
          throw new ScopeRegistrationError('Oids must declare their shortcode');
        }
        ScopeRegistry.registeredByScopename.set(scopename, shortcode);
        ScopeRegistry.registeredByKey.set(shortcode, scopename);
        return shortcode;
      case ScopeTypes.TILDE:
        const key = xxhash.hash(Buffer.from(scopename), 0xcafecafe);
        ScopeRegistry.registeredByScopename.set(scopename, key);
        ScopeRegistry.registeredByKey.set(key, scopename);
        return key;
    }
  }

  resetRegistery() {
    ScopeRegistry.registeredByKey = new Map<string | number, string>();
    ScopeRegistry.registeredByScopename = new Map<string, string | number>();
  }
}
export const scopeRegistry = new ScopeRegistry();
