import { Registry2, ScopeName, ServiceName } from './implementations/scope-registry';

const scopeRegistry = new Registry2();

export class Oid {
  private id: string | number;
  private scope: string;
  private service: string;
  private deprecated: string;

  static registry = scopeRegistry;

  static RegisterScope(_name: string, _shortcode: string, _service: string = 'alpha') {
    return Oid.registry.register(_name, _shortcode, _service);
  }
  static UnregisterScopes() {
    Oid.registry.resetRegistery();
  }
  static Create(_name: string, id: number, _service?: string): Oid {
    const name = new ScopeName(_name);
    const scope = Oid.registry.getScope(name);
    const factory = Oid.registry.getFactoryFor(scope);
    return factory.create(name, id, new ServiceName(_service || scope.service.toString()));
  }
  constructor(public oid: string) {
    const factory = Oid.registry.getFactoryByOidString(oid);
    const { id, scope, suffix } = factory.unwrap(this);
    this.id = id;
    this.scope = scope.name.toString();
    this.service = scope.service.toString();
    this.deprecated = `${scope.shortcode}_${suffix}`;
  }
  unwrap(): { id: string | number; scope: string; service: string } {
    return { id: this.id, scope: this.scope, service: this.service };
  }
  // Overide `Object.valueOf()` so GraphQL ID type can convert to the 'primitive' type
  valueOf(): string {
    return this.oid;
  }

  toString(): string {
    return this.oid;
  }

  getDeprecatedFormat(): string {
    console.warn('DEPRECATED FORMAT');
    return this.deprecated;
  }
}

// export class Oid2 {
//   private id: string | number;
//   private scope: string;
//   private static readonly registry = scopeRegistry;

//   static RegisterScope(scope: string, shortcode?: string): Scope {
//     return Oid2.registry.register(scope, shortcode);
//   }
//   static UnregisterScopes() {
//     Oid2.registry.resetRegistery();
//   }
//   static Create(scopename: string, id: string | number): Oid2 {
//     const factory = Oid2.registry.getFactoryByScopename(scopename);
//     const oid = factory.create(scopename, id);
//     return oid;
//   }
//   /**
//    * @deprecated in favor of `Oid.Create()`
//    * @param scopename
//    * @param id
//    */
//   static create(scopename: string, id: string | number) {
//     return this.Create(scopename, id);
//   }
//   constructor(public oid: string) {
//     const factory = Oid2.registry.getFactoryByOidString(oid);
//     const { id, scope } = factory.unwrap(this);
//     this.id = id;
//     this.scope = scope;
//   }

//   unwrap(): { id: string | number; scope: string } {
//     return { id: this.id, scope: this.scope };
//   }

//   // Overide `Object.valueOf()` so GraphQL ID type can convert to the 'primitive' type
//   valueOf(): string {
//     return this.oid;
//   }

//   toString(): string {
//     return this.oid;
//   }
// }
