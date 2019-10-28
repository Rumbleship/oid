import { Oid } from '../../oid';
import { ScopeRegistry } from '../scope-registry';
import { OidFactory } from '../oid-factory.interface';

function toBase64(source: string | number): string {
  return Buffer.from('' + source).toString('base64');
}

function fromBase64(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}

/**
 * Specific for Banking for historic reasons
 */
export class TildeOidFactory implements OidFactory {
  create(scopename: string, id: string | number) {
    const key = ScopeRegistry.GetKey(scopename);
    const oid_json = JSON.stringify({ key, id });
    const encoded = toBase64(oid_json);
    return new Oid(`~${encoded}`);
  }
  unwrap(oid: Oid): { scope: string; id: string | number } {
    const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
    const { id, key } = JSON.parse(plain);
    const scope = ScopeRegistry.GetScopename(key);
    return { id, scope };
  }
}
