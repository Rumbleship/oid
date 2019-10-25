import { scopeRegistry, ScopeRegistry } from './scope-registry';
import { OidFactory, ModernOidFactory, TildeOidFactory } from './factories';
import { OidFactoryMapByScope } from './lookup/scope-to-factory.lookup';

function fromBase64(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}

export class Oid2 {
  private static readonly registry = scopeRegistry;

  static RegisterScope(scope: string, shortcode?: string) {
    return Oid2.registry.register(scope, shortcode);
  }
  static getFactoryByScopename(scopename: string): OidFactory {
    const factory = OidFactoryMapByScope.get(scopename) || new ModernOidFactory();
    if (!factory) {
      throw new Error(
        'Scope has no corresponding factory. Do you want to create a HashidOid, TildeOid, or ModernOid? (You want the last one).'
      );
    }
    return factory;
  }
  static getFactoryByEncoded(external_oid: string): OidFactory {
    if (external_oid[0] === `~`) {
      return new TildeOidFactory();
    }

    const matches = ScopeRegistry.hashIdRegEx.exec(external_oid);
    if (!matches || (matches && matches.length !== 3)) {
      try {
        const { key } = JSON.parse(fromBase64(external_oid));
        return this.getFactoryByScopename(ScopeRegistry.getScopename(key));
      } catch (e) {
        throw new Error(`Malformed oid format: ${external_oid}`);
      }
    }

    const [, prefix] = matches;

    const scope = ScopeRegistry.getScopename(prefix);
    return this.getFactoryByScopename(scope);
  }
  static create(scopename: string, id: string | number) {
    const factory = Oid2.getFactoryByScopename(scopename);
    return factory.create(scopename, id);
  }
  constructor(public oid: string) {}

  unwrap(): { id: string | number; scope: string } {
    const factory = Oid2.getFactoryByEncoded(this.oid);
    return factory.unwrap(this);
  }

  static unregisterScopes() {
    Oid2.registry.resetRegistery();
  }
}

Oid2.RegisterScope('BankAccount');
Oid2.RegisterScope('PurchaseOrder', 'po');
Oid2.RegisterScope('Workflow', 'wf');
