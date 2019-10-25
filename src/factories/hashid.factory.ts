import Hashids from 'hashids';
import { Oid2 } from '../oid';
import { HashidScopeNames } from '../scopes';
import { ScopeRegistry } from '../scope-registry';
import { OidFactory } from './factory.interface';

/**
 * For old style Alpha hashid's
 */
export class HashidOidFactory implements OidFactory {
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
