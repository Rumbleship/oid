import { CheckdigitOidFactory } from './implementations/checkdigit/checkdigit.factory';
import { scopeRegistry, ScopeRegistry } from './implementations/scope-registry';
import { OidFactoryMapByScope } from './implementations/scope-to-factory.lookup';
import { OidFactory } from './implementations/oid-factory.interface';
import { TildeOidFactory } from './implementations/tilde';
import { MalformedOidError } from './errors';

function fromBase64(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}

export class Oid {
  public id: string | number;
  public scope: string;
  private factory: OidFactory;
  private static readonly registry = scopeRegistry;

  // Overide Object.valueOf so that the GraphQL ID type can convert to the 'primitive' type. In this case a
  // string.
  valueOf() {
    return this.oid;
  }

  toString() {
    return this.oid;
  }

  static RegisterScope(scope: string, shortcode?: string) {
    return Oid.registry.register(scope, shortcode);
  }
  static getFactoryByScopename(scopename: string): OidFactory {
    const factory = OidFactoryMapByScope.get(scopename) || new CheckdigitOidFactory();
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
        throw new MalformedOidError(`Malformed tilde oid format: ${external_oid}`);
      }
    }

    const [, prefix] = matches;

    const scope = ScopeRegistry.getScopename(prefix);
    return this.getFactoryByScopename(scope);
  }
  static create(scopename: string, id: string | number) {
    const factory = Oid.getFactoryByScopename(scopename);
    const oid = factory.create(scopename, id);
    oid.factory = factory;
    return oid;
  }
  constructor(public oid: string) {
    this.factory = Oid.getFactoryByEncoded(oid);
    const { id, scope } = this.factory.unwrap(this);
    this.id = id;
    this.scope = scope;
  }

  unwrap(): { id: string | number; scope: string } {
    // return this.factory.unwrap(this);
    return { id: this.id, scope: this.scope };
  }

  static unregisterScopes() {
    Oid.registry.resetRegistery();
  }
}

Oid.RegisterScope('BankAccount');
Oid.RegisterScope('PurchaseOrder', 'po');
Oid.RegisterScope('Workflow', 'wf');
