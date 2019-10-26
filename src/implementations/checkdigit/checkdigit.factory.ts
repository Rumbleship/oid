import Hashids from 'hashids';

import { OidFactory } from '../oid-factory.interface';
import { AlphaScopeNames } from './alpha.scopes';
import { ScopeRegistry } from '../scope-registry';
import { Oid2 } from '../../oid';

export class CheckdigitOidFactory implements OidFactory {
  static GetHashidOidOptions(scopename: string) {
    switch (scopename) {
      case AlphaScopeNames.Buyer:
        return {
          length: 4,
          checksum: 2,
          salt: 'Division'
        };
      case AlphaScopeNames.Supplier:
        return {
          length: 4,
          checksum: 2,
          salt: 'Division'
        };
      case AlphaScopeNames.User:
        return {
          length: 4,
          checksum: 2,
          salt: 'User'
        };
      case AlphaScopeNames.PurchaseOrder:
        return {
          length: 4,
          checksum: 3,
          salt: 'purchaseOrder'
        };
      case AlphaScopeNames.Shipment:
        return {
          length: 4,
          checksum: 5,
          salt: 'shipment'
        };
      default:
        return {
          shortcode: null, // TODO FIX THIS??
          length: 6,
          checksum: 6,
          salt: 'rfi_oid'
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
    const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
    const shortcode = ScopeRegistry.getKey(scopename);
    const encoded = this.getEncoder(scopename).encode(id);
    const check_digit = this.checksumDigit(encoded, checksum);
    return new Oid2(`${shortcode}_${encoded}${check_digit}`);
  }

  verifyAndStripCheckDigit(scope: string, shortcode: string, suffix: string): string {
    const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scope);
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
    const { salt, length } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
    // if the scopename is in the alpha scopes, length must be 4 for backward compatibility; else 5
    return new Hashids(salt, length, ScopeRegistry.ALPHABET);
  }
}
