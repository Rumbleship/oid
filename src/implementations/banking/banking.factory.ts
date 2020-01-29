import { OidFactory2 } from './../oid-factory.interface';
import { ScopeName, Registry2 } from './../../oid';
import { Oid } from '../../oid';
import { toBase64, fromBase64 } from '../../util';

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
  unwrap(oid: Oid): { scope: string; id: string | number; service: string } {
    const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
    const { id, key } = JSON.parse(plain);
    // const scope = this.registry.getScopename(key);
    const scope = this.registry.getScope(key);
    return { id, scope: scope.name.toString(), service: 'banking' };
  }
}
