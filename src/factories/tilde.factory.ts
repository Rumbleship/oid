import { ScopeRegistry } from '../scope-registry';
import { OidFactory } from './factory.interface';
import { Oid2 } from 'src/oid';

function toBase64(source: string | number): string {
  return Buffer.from('' + source).toString('base64');
}

function fromBase64(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}

export class TildeOidFactory implements OidFactory {
  create(scopename: string, id: string | number) {
    const key = ScopeRegistry.getKey(scopename);
    const oid_json = JSON.stringify({ key, id });
    const encoded = toBase64(oid_json);
    return new Oid2(`~${encoded}`);
  }
  unwrap(oid: Oid2): { scope: string; id: string | number } {
    const plain = fromBase64(oid.oid[0] === '~' ? oid.oid.substring(1) : oid.oid);
    const { id, key } = JSON.parse(plain);
    const scope = ScopeRegistry.getScopename(key);
    return { id, scope };
  }
}
