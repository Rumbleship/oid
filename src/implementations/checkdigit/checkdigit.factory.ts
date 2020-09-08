import { InvalidCheckdigitError, MalformedOidError } from './../../errors/index';

import Hashids from 'hashids';

import { AlphaHashidScopes } from './historical.scopes';
// eslint-disable-next-line import/no-cycle
import { OidFactory } from '../oid-factory.interface';
// eslint-disable-next-line import/no-cycle
import { Oid } from '../../oid';
// eslint-disable-next-line import/no-cycle
import { ScopeRegistry } from './../scope-registry';

export class CheckdigitOidFactory implements OidFactory {
  private readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  static GetHashidOidOptions(
    scopename: string
  ): {
    length: number;
    checksum: number;
    salt: string;
  } {
    if (Reflect.get(AlphaHashidScopes, scopename)) {
      switch (scopename) {
        case AlphaHashidScopes.User:
          return {
            length: 4,
            checksum: 2,
            salt: 'User'
          };
        case AlphaHashidScopes.PurchaseOrder:
          return {
            length: 4,
            checksum: 3,
            salt: 'purchaseOrder'
          };
        case AlphaHashidScopes.Shipment:
          return {
            length: 4,
            checksum: 5,
            salt: 'shipment'
          };
      }
    }

    return {
      length: 6,
      checksum: 6,
      salt: 'rfi_oid'
    };
  }

  constructor(private registry: ScopeRegistry) {}

  checksumDigit(oid_suffix: string, checksum = 0): string {
    const coefficients = [1, 5, 7];
    const chars = oid_suffix.split('');
    const sum =
      chars.reduce((acc, c, i) => {
        const coefficient = coefficients[i % 3];
        acc += this.ALPHABET.indexOf(c) * coefficient;
        return acc;
      }, 0) + checksum;
    const checksumIndex = this.ALPHABET.length - 1 - (sum % this.ALPHABET.length);
    return this.ALPHABET.charAt(checksumIndex);
  }
  create(scopename: string, id: string | number): Oid {
    if (typeof id !== 'number') {
      throw new MalformedOidError('A Hashid Oid must be created with a db_id type:number');
    }
    const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
    const shortcode = this.registry.getKey(scopename);
    const suffix = this.getEncoder(scopename).encode(id);
    const check_digit = this.checksumDigit(suffix, checksum);
    return new Oid(`${shortcode}_${suffix}${check_digit}`);
  }

  verifyAndStripCheckDigit(scope: string, shortcode: string, suffix: string): string {
    const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scope);

    const hashLength = suffix.length - 1;
    const checksumDigit = suffix.substring(hashLength, hashLength + 1);
    const hash = suffix.substring(0, hashLength);
    if (checksumDigit !== this.checksumDigit(hash, checksum)) {
      throw new InvalidCheckdigitError(`Malformed oid: ${shortcode}_${suffix}`);
    }
    return hash;
  }
  unwrap(oid: Oid): { scope: string; id: string | number } {
    const matches = this.registry.hashIdRegEx.exec(oid.oid);
    if (!matches || (matches && matches.length !== 3)) {
      throw new MalformedOidError(`Malformed oid format: ${oid.oid}`);
    }
    const [, shortcode, suffix] = matches;
    const scope = this.registry.getScopename(shortcode);
    const hashed = this.verifyAndStripCheckDigit(scope, shortcode, suffix);
    const id = this.getEncoder(scope).decode(hashed)[0];
    return { id, scope };
  }

  getEncoder(scopename: string): Hashids {
    const { salt, length } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
    return new Hashids(salt, length, this.ALPHABET);
  }
}
