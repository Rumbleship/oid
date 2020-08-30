// eslint-disable-next-line import/no-cycle
import { scopeRegistry, Scope } from './implementations/scope-registry';

export class Oid {
  private id: string | number;
  private scope: string;
  private static readonly registry = scopeRegistry;

  static RegisterScope(scope: string, shortcode?: string): Scope {
    return Oid.registry.register(scope, shortcode);
  }
  static UnregisterScopes(): void {
    Oid.registry.resetRegistery();
  }
  static Create(scopename: string, id: string | number): Oid {
    const factory = Oid.registry.getFactoryByScopename(scopename);
    const oid = factory.create(scopename, id);
    return oid;
  }
  /**
   * @deprecated in favor of `Oid.Create()`
   * @param scopename
   * @param id
   */
  static create(scopename: string, id: string | number): Oid {
    return this.Create(scopename, id);
  }
  constructor(public oid: string) {
    const factory = Oid.registry.getFactoryByOidString(oid);
    const { id, scope } = factory.unwrap(this);
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
