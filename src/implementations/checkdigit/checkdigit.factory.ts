import { OidFactory2 } from './../oid-factory.interface';
import { Oid, ScopeName, ServiceName, Registry2, Shortcode, Scope } from './../../oid';
import { InvalidCheckdigitError } from './../../errors/index';
import { MalformedOidError } from '../../errors';
import Hashids from 'hashids';

import { AlphaHashidScopes } from './historical.scopes';
// import { OidFactory } from '../oid-factory.interface';

export class CheckdigitOidFactory implements OidFactory2 {
  private readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
  static GetHashidOidOptions(scope: Scope) {
    const scopename = scope.name.toString();
    if (Reflect.get(AlphaHashidScopes, scopename.toString())) {
      switch (scopename.toString()) {
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

  constructor(private registry: Registry2) {}

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
  create(scopename: ScopeName, id: string | number, service: ServiceName) {
    if (typeof id !== 'number') {
      throw new MalformedOidError('A Hashid Oid must be created with a db_id type:number');
    }
    const scope = this.registry.getScope(scopename);
    const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scope);
    const shortcode = scope.shortcode.toString();
    const suffix = this.getEncoder(scope).encode(id);
    const check_digit = this.checksumDigit(suffix, checksum);
    return new Oid(`${shortcode}.${service}_${suffix}${check_digit}`);
  }

  verifyAndStripCheckDigit(scope: Scope, suffix: string): string {
    const { shortcode } = scope;
    const { checksum } = CheckdigitOidFactory.GetHashidOidOptions(scope);

    const hashLength = suffix.length - 1;
    const checksumDigit = suffix.substring(hashLength, hashLength + 1);
    const hash = suffix.substring(0, hashLength);
    if (checksumDigit !== this.checksumDigit(hash, checksum)) {
      throw new InvalidCheckdigitError(`Malformed oid: ${shortcode}_${suffix}`);
    }
    return hash;
  }
  unwrap(oid: Oid): { scope: string; id: string | number; service: string } {
    const matches = this.registry.hashIdRegEx.exec(oid.oid);
    if (!matches || (matches && matches.length !== 3)) {
      throw new MalformedOidError(`Malformed oid format: ${oid.oid}`);
    }
    const [, shortcode, suffix] = matches;
    const scope = this.registry.getScope(new Shortcode(shortcode));
    const hashed = this.verifyAndStripCheckDigit(scope, suffix);
    const id = this.getEncoder(scope).decode(hashed)[0];
    return { id, scope: scope.name.toString(), service: 'foo' };
  }

  getEncoder(scope: Scope) {
    const { salt, length } = CheckdigitOidFactory.GetHashidOidOptions(scope);
    return new Hashids(salt, length, this.ALPHABET);
  }
}
