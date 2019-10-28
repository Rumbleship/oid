import { Oid } from '../../oid';
import { OidFactory } from '../oid-factory.interface';
import { toBase64, fromBase64 } from '../../util';

/**
 * Specific for Banking for historic reasons
 */
export class BankingOidFactory implements OidFactory {
  constructor(private registry: any) {}
  create(scopename: string, id: string | number) {
    const key = this.registry.getKey(scopename);
    const oid_json = JSON.stringify({ key, id });
    const encoded = toBase64(oid_json);
    return new Oid(`~${encoded}`);
  }
  unwrap(oid: Oid): { scope: string; id: string | number } {
    const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
    const { id, key } = JSON.parse(plain);
    const scope = this.registry.getScopename(key);
    return { id, scope };
  }
}
