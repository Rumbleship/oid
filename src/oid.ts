import * as xxhash from 'xxhash';
import { OidFactory2 } from './implementations/oid-factory.interface';
import { MalformedOidError, ScopeRegistrationError } from './errors/index';
import { BankingOidFactory } from './implementations/banking/banking.factory';
import { CheckdigitOidFactory } from './implementations/checkdigit/checkdigit.factory';
// import { scopeRegistry, Scope } from './implementations/scope-registry';
import { fromBase64 } from './util';

abstract class Name {
  constructor(private name: string) {}
  toString() {
    return this.name;
  }
}
export class ServiceName extends Name {
  constructor(name: string) {
    const [, service] = name.indexOf('.') > -1 ? name.split('.') : 'DEFAULT_SERVICE_NAME';
    super(service);
  }
}
export class Shortcode extends Name {
  constructor(name: string) {
    const [shortcode] = name.indexOf('.') > -1 ? name.split('.') : name;
    super(shortcode);
  }
}
export class ScopeName extends Name {}

export class Scope {
  constructor(
    public readonly name: ScopeName,
    public readonly shortcode: string,
    public readonly service: ServiceName
  ) {
    if (this.service.toString() === 'banking') {
      this.shortcode = xxhash.hash(Buffer.from(shortcode), 0xcafecafe);
    }
  }
  toString() {
    return `${this.name}.${this.service}`;
  }
}

export class Registry2 {
  private shortcodeToScope = new Map<string, Scope>();
  private nameToScope = new Map<string, Scope>();
  private scopes = new Map<string, Scope>();
  public readonly hashIdRegEx = /^(.+)_([a-z0-9]+)/;

  getFactoryByOidString(oid_string: string): OidFactory2 {
    if (oid_string[0] === `~`) {
      return new BankingOidFactory(this);
    }
    const matches = this.hashIdRegEx.exec(oid_string);
    if (!matches || (matches && matches.length !== 3)) {
      try {
        // try to parse the encoded json...
        JSON.parse(fromBase64(oid_string));
        return new BankingOidFactory(this);
      } catch (e) {
        throw new MalformedOidError(`Malformed tilde oid format: ${oid_string}`);
      }
    }

    return new CheckdigitOidFactory(this);
  }

  getMapFor(val: ScopeName | Shortcode) {
    if (val instanceof Shortcode) {
      return this.shortcodeToScope;
    }
    if (val instanceof ScopeName) {
      return this.nameToScope;
    }
    throw new Error('invalid lookup');
  }
  register(name: string, shortcode: string, service: string): Scope {
    const scope = new Scope(new ScopeName(name), shortcode, new ServiceName(service));
    if (this.scopes.has(scope.toString())) {
      if (this.scopes.get(scope.toString())?.shortcode !== shortcode) {
        throw new ScopeRegistrationError(
          `Name+Service already registered to shortcode: ${shortcode}`
        );
      }
    }
    this.scopes.set(scope.toString(), scope);
    this.shortcodeToScope.set(shortcode, scope);
    this.nameToScope.set(name, scope);
    return scope;
  }

  getScope(name: ScopeName | Shortcode): Scope {
    const scope = this.getMapFor(name).get(name.toString());
    if (!scope) {
      throw new Error(`Unregistered Scope: ${name}`);
    }
    return scope;
  }

  getFactoryFor(scope: Scope) {
    if (scope.service.toString() === 'banking') {
      return new BankingOidFactory(this);
    }
    return new CheckdigitOidFactory(this);
  }
  resetRegistery() {
    this.shortcodeToScope = new Map<string, Scope>();
    this.nameToScope = new Map<string, Scope>();
    this.scopes = new Map<string, Scope>();
  }
}

const scopeRegistry = new Registry2();

export class Oid {
  private id: string | number;
  private scope: string;
  private service: string;

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
    const { id, scope, service } = factory.unwrap(this);
    this.id = id;
    this.scope = scope;
    this.service = service;
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
