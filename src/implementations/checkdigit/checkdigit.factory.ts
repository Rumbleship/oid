import { InvalidCheckdigitError } from './../../errors/index';
import { MalformedOidError } from '../../errors';
import Hashids from 'hashids';

import { AlphaHashidScopes, NoCheckdigitArbiterScopes } from './historical.scopes';
import { OidFactory } from '../oid-factory.interface';
import { Oid } from '../../oid';

export class CheckdigitOidFactory implements OidFactory {
  private readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  static GetHashidOidOptions(scopename: string) {
    if (Reflect.get(NoCheckdigitArbiterScopes, scopename)) {
      return {
        length: 5,
        checksum: 3,
        salt: 'rfi_oid'
      };
    }
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

  constructor(private registry: any) {}

  checksumDigit(oid_suffix: string, checksum: number = 0) {
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
  create(scopename: string, id: string | number) {
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
    const { checksum, length } = CheckdigitOidFactory.GetHashidOidOptions(scope);
    if (Reflect.get(NoCheckdigitArbiterScopes, scope) && suffix.length === length) {
      // We've consumed an Arbiter hashid that was created without a check digit
      return suffix;
    }
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

  getEncoder(scopename: string) {
    const { salt, length } = CheckdigitOidFactory.GetHashidOidOptions(scopename);
    return new Hashids(salt, length, this.ALPHABET);
  }
}
