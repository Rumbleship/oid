import Hashids from 'hashids';
import { ScopeRegistry } from '../scope-registry';
import { Oid2 } from '../../oid';
import { OidFactory } from '../oid-factory.interface';

export class PlainOidFactory implements OidFactory {
  create(scopename: string, id: string | number) {
    if (typeof id !== 'number') {
      throw new Error('A PlainOid must be created with a db_id type:number');
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
