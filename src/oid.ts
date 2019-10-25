import * as xxhash from 'xxhash';
import Hashids from 'hashids';
function toBase64(source: string | number): string {
  return Buffer.from('' + source).toString('base64');
}
function fromBase64(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}
enum HashidScopeNames {
  Buyer = 'Buyer',
  Supplier = 'Supplier',
  PurchaseOrder = 'PurchaseOrder',
  Shipment = 'Shipment',
  User = 'User'
}

enum TildeScopeNames {
  AchGateway = 'AchGateway',
  BankAccount = 'BankAccount',
  BankTransaction = 'BankTransaction',
  OrderReference = 'OrderReference',
  PaymentRequest = 'PaymentRequest'
}

enum OidScopeNames {
  Activity = 'Activity',
  BusinessApplication = 'BusinessApplication',
  Company = 'Company',
  ExternalEvent = 'ExternalEvent',
  Workflow = 'Workflow'
}

export enum ScopeTypes {
  OID = 'OID',
  TILDE = 'TILDE',
  HASHID = 'HASHID',
  EXPERIMENTAL = 'EXPERIMENTAL'
}

class HashidOidFactory implements OidFactory {
  static GetHashidOidOptions(scopename: string) {
    switch (scopename as HashidScopeNames) {
      case HashidScopeNames.Buyer:
        return {
          shortcode: 'b',
          checksum: 2,
          salt: 'Division'
        };
      case HashidScopeNames.Supplier:
        return {
          shortcode: 's',
          checksum: 2,
          salt: 'Division'
        };
      case HashidScopeNames.User:
        return {
          shortcode: 'u',
          checksum: 2,
          salt: 'User'
        };
      case HashidScopeNames.PurchaseOrder:
        return {
          shortcode: 'po',
          checksum: 3,
          salt: 'purchaseOrder'
        };
      case HashidScopeNames.Shipment:
        return {
          shortcode: 'shp',
          checksum: 5,
          salt: 'shipment'
        };
    }
  }

  checksumDigit(oid_suffix: string, checksum: number = 0) {
    const coefficients = [1, 5, 7];
    const chars = oid_suffix.split('');
    const sum =
      chars.reduce((acc, c, i) => {
        const coefficient = coefficients[i % 3];
        acc += ScopeRegistry.ALPHABET.indexOf(c) * coefficient;
        return acc;
      }, 0) + checksum;
    const checksumIndex = ScopeRegistry.ALPHABET.length - 1 - (sum % ScopeRegistry.ALPHABET.length);
    return ScopeRegistry.ALPHABET.charAt(checksumIndex);
  }
  create(scopename: string, id: string | number) {
    if (typeof id !== 'number') {
      throw new Error('A Hashid Oid must be created with a db_id type:number');
    }
    const { checksum } = HashidOidFactory.GetHashidOidOptions(scopename);
    const shortcode = ScopeRegistry.getKey(scopename);
    const encoded = this.getEncoder(scopename).encode(id);
    const check_digit = this.checksumDigit(encoded, checksum);
    return new Oid2(`${shortcode}_${encoded}${check_digit}`);
  }

  verifyAndStripCheckDigit(scope: string, shortcode: string, suffix: string): string {
    const { checksum } = HashidOidFactory.GetHashidOidOptions(scope);
    const hashLength = suffix.length - 1;
    const checksumDigit = suffix.substring(hashLength, hashLength + 1);
    const hash = suffix.substring(0, hashLength);
    if (checksumDigit !== this.checksumDigit(hash, checksum)) {
      throw new Error(`Malformed oid: ${shortcode}_${suffix}`);
    }
    return hash;
  }
  unwrap(oid: Oid2): { scope: string; id: string | number } {
    const matches = ScopeRegistry.hashIdRegEx.exec(oid.oid);
    if (!matches || (matches && matches.length !== 3)) {
      throw new Error(`Malformed oid format: ${oid.oid}`);
    }
    const [, shortcode, suffix] = matches;
    const scope = ScopeRegistry.getScopename(shortcode);
    const hashed = this.verifyAndStripCheckDigit(scope, shortcode, suffix);
    const id = this.getEncoder(scope).decode(hashed)[0];
    return { id, scope };
  }

  getEncoder(scopename: string) {
    const { salt } = HashidOidFactory.GetHashidOidOptions(scopename);
    // HashidOids are minLength 4 because they include a checkdigit
    return new Hashids(salt, 4, ScopeRegistry.ALPHABET);
  }
}
class ModernOidFactory implements OidFactory {
  create(scopename: string, id: string | number) {
    if (typeof id !== 'number') {
      throw new Error('A ModernOid must be created with a db_id type:number');
    }
    const shortcode = ScopeRegistry.getKey(scopename);
    const encoded = this.getEncoder(scopename).encode(id);
    return new Oid2(`${shortcode}_${encoded}`);
  }
  unwrap(oid: Oid2): { scope: string; id: string | number } {
    const matches = ScopeRegistry.hashIdRegEx.exec(oid.oid);
    if (!matches || (matches && matches.length !== 3)) {
      throw new Error(`Malformed oid format: ${oid.oid}`);
    }

    const scope = ScopeRegistry.getScopename(matches[1]);
    const id = this.getEncoder(scope).decode(matches[2])[0];
    return { id, scope };
  }
  getEncoder(_scopename: string) {
    return new Hashids('rfi_oid', 5, ScopeRegistry.ALPHABET);
  }
}
class TildeOidFactory implements OidFactory {
  create(scopename: string, id: string | number) {
    const key = ScopeRegistry.getKey(scopename);
    const oid_json = JSON.stringify({ key, id });
    const encoded = toBase64(oid_json);
    return new Oid2(`~${encoded}`);
  }
  unwrap(oid: Oid2): { scope: string; id: string | number } {
    const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
    const { id, key } = JSON.parse(plain);
    const scope = ScopeRegistry.getScopename(key);
    return { id, scope };
  }
}
const hashidFactory = new HashidOidFactory();
const tildeFactory = new TildeOidFactory();
const modernOidFactory = new ModernOidFactory();
const OidFactoryMapByScope: Map<string, OidFactory> = new Map<string, OidFactory>();

for (const scopeName of Object.keys(TildeScopeNames)) {
  OidFactoryMapByScope.set(scopeName, tildeFactory);
}
for (const scopeName of Object.keys(HashidScopeNames)) {
  OidFactoryMapByScope.set(scopeName, hashidFactory);
}
for (const scopeName of Object.keys(OidScopeNames)) {
  OidFactoryMapByScope.set(scopeName, modernOidFactory);
}

interface OidFactory {
  create: (scopename: string, id: string | number) => Oid2;
  unwrap: (oid: Oid2) => { id: string | number; scope: string };
  getEncoder?: (scopename: string) => Hashids;
}

class ScopeRegistry {
  static ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  static readonly hashIdRegEx = /^(.+)_([a-z0-9]+)/;
  static readonly FactoryMap = OidFactoryMapByScope;
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
const scopeRegistry = new ScopeRegistry();

export class Oid2 {
  private static readonly registry = scopeRegistry;

  static RegisterScope(scope: string, shortcode?: string) {
    return Oid2.registry.register(scope, shortcode);
  }
  static getFactoryByScopename(scopename: string): OidFactory {
    const factory = ScopeRegistry.FactoryMap.get(scopename) || new ModernOidFactory();
    if (!factory) {
      throw new Error(
        'Scope has no corresponding factory. Do you want to create a HashidOid, TildeOid, or ModernOid? (You want the last one).'
      );
    }
    return factory;
  }
  static getFactoryByEncoded(external_oid: string): OidFactory {
    if (external_oid[0] === `~`) {
      return new TildeOidFactory();
    }

    const matches = ScopeRegistry.hashIdRegEx.exec(external_oid);
    if (!matches || (matches && matches.length !== 3)) {
      try {
        const { key } = JSON.parse(fromBase64(external_oid));
        return this.getFactoryByScopename(ScopeRegistry.getScopename(key));
      } catch (e) {
        throw new Error(`Malformed oid format: ${external_oid}`);
      }
    }

    const [, prefix] = matches;

    const scope = ScopeRegistry.getScopename(prefix);
    return this.getFactoryByScopename(scope);
  }
  static create(scopename: string, id: string | number) {
    const factory = Oid2.getFactoryByScopename(scopename);
    return factory.create(scopename, id);
  }
  constructor(public oid: string) {}

  unwrap(): { id: string | number; scope: string } {
    const factory = Oid2.getFactoryByEncoded(this.oid);
    return factory.unwrap(this);
  }

  static unregisterScopes() {
    Oid2.registry.resetRegistery();
  }
}

Oid2.RegisterScope('BankAccount');
Oid2.RegisterScope('PurchaseOrder', 'po');
Oid2.RegisterScope('Workflow', 'wf');
