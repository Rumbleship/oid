import * as xxhash from 'xxhash';
import { ScopeTypes, OidScopeNames, HashidScopeNames, TildeScopeNames } from './scopes';

export class ScopeRegistry {
  static ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  static readonly hashIdRegEx = /^(.+)_([a-z0-9]+)/;
  private static registeredByKey: Map<string | number, string> = new Map<string | number, string>();
  private static registeredByScopename: Map<string, string | number> = new Map<
    string,
    string | number
  >();

  static getScopeType(scopename: string): ScopeTypes {
    if (Reflect.get(OidScopeNames, scopename)) {
      return ScopeTypes.OID;
    }

    if (Reflect.get(HashidScopeNames, scopename)) {
      return ScopeTypes.HASHID;
    }

    if (Reflect.get(TildeScopeNames, scopename)) {
      return ScopeTypes.TILDE;
    }

    return ScopeTypes.EXPERIMENTAL;
  }

  static getScopename(key: string | number): string {
    const scopename = this.registeredByKey.get(key);
    if (!scopename) {
      throw new Error(`key ${key} is not registered`);
    }
    return scopename;
  }

  static getKey(scopename: string): string | number {
    const key = this.registeredByScopename.get(scopename);
    if (!key) {
      throw new Error(`scope ${scopename} not registered`);
    }
    return key;
  }

  register(scopename: string, shortcode?: string): string | number {
    const registeredKey = ScopeRegistry.registeredByScopename.get(scopename);

    if (registeredKey && shortcode && registeredKey !== shortcode) {
      throw new Error(
        `Cannot reregister Scope:${scopename} has already been registered under shortcode:${shortcode}`
      );
    }
    switch (ScopeRegistry.getScopeType(scopename)) {
      case ScopeTypes.EXPERIMENTAL:
      case ScopeTypes.OID:
        if (!shortcode) {
          throw new Error('ModernOid scopes must declare their shortcode');
        }
        ScopeRegistry.registeredByScopename.set(scopename, shortcode);
        ScopeRegistry.registeredByKey.set(shortcode, scopename);
        return shortcode;
      case ScopeTypes.HASHID:
        if (!shortcode) {
          throw new Error('Hashid scopes must declare their shortcode');
        }
        ScopeRegistry.registeredByScopename.set(scopename, shortcode);
        ScopeRegistry.registeredByKey.set(shortcode, scopename);
        return shortcode;
      case ScopeTypes.TILDE:
        if (shortcode) {
          throw new Error('Tilde scopes cannot declare a shortcode');
        }
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
