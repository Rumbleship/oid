import { CheckdigitOidFactory } from './implementations/checkdigit/checkdigit.factory';
import { scopeRegistry, ScopeRegistry } from './implementations/scope-registry';
import { OidFactoryMapByScope } from './implementations/scope-to-factory.lookup';
import { OidFactory } from './implementations/oid-factory.interface';
import { BankingOidFactory } from './implementations/banking';
import { MalformedOidError } from './errors';

function fromBase64(source: string): string {
  return Buffer.from(source, 'base64').toString('ascii');
}

export class Oid {
  private id: string | number;
  private scope: string;
  private factory: OidFactory;
  private static readonly registry = scopeRegistry;

  static RegisterScope(scope: string, shortcode?: string) {
    return Oid.registry.register(scope, shortcode);
  }
  static UnregisterScopes() {
    Oid.registry.resetRegistery();
  }
  static GetFactoryByScopename(scopename: string): OidFactory {
    const factory = OidFactoryMapByScope.get(scopename) || new CheckdigitOidFactory();
    return factory;
  }
  static GetFactoryByEncoded(external_oid: string): OidFactory {
    if (external_oid[0] === `~`) {
      return new BankingOidFactory();
    }

    const matches = ScopeRegistry.hashIdRegEx.exec(external_oid);
    if (!matches || (matches && matches.length !== 3)) {
      try {
        const { key } = JSON.parse(fromBase64(external_oid));
        return this.GetFactoryByScopename(ScopeRegistry.GetScopename(key));
      } catch (e) {
        throw new MalformedOidError(`Malformed tilde oid format: ${external_oid}`);
      }
    }

    const [, prefix] = matches;

    const scope = ScopeRegistry.GetScopename(prefix);
    return this.GetFactoryByScopename(scope);
  }
  static Create(scopename: string, id: string | number) {
    const factory = Oid.GetFactoryByScopename(scopename);
    const oid = factory.create(scopename, id);
    return oid;
  }
  constructor(public oid: string) {
    this.factory = Oid.GetFactoryByEncoded(oid);
    const { id, scope } = this.factory.unwrap(this);
    this.id = id;
    this.scope = scope;
  }

  unwrap(): { id: string | number; scope: string } {
    return { id: this.id, scope: this.scope };
  }

  // Overide `Object.valueOf()` so GraphQL ID type can convert to the 'primitive' type
  valueOf(): string {
    return this.oid;
  }

  toString(): string {
    return this.oid;
  }
}
