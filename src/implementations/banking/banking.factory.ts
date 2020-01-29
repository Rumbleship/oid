import { ScopeName, Scope } from './../scope-registry';
import { OidFactory2 } from './../oid-factory.interface';

import { Oid } from '../../oid';
import { toBase64, fromBase64 } from '../../util';
import { Registry2 } from '../scope-registry';

/**
 * Specific for Banking for historic reasons
 */
export class BankingOidFactory implements OidFactory2 {
  constructor(private registry: Registry2) {}
  create(scopename: ScopeName, id: string | number) {
    const key = this.registry.getScope(scopename).shortcode.toString();
    const oid_json = JSON.stringify({ key, id });
    const encoded = toBase64(oid_json);
    return new Oid(`~${encoded}`);
  }
  unwrap(oid: Oid): { scope: Scope; id: string; suffix: string } {
    const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
    const { id, key } = JSON.parse(plain);
    // const scope = this.registry.getScopename(key);
    const scope = this.registry.getScope(key);
    return { id, scope, suffix: plain };
  }
}
