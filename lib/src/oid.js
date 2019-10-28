"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_registry_1 = require("./implementations/scope-registry");
class Oid {
    constructor(oid) {
        this.oid = oid;
        const factory = Oid.registry.getFactoryByOidString(oid);
        const { id, scope } = factory.unwrap(this);
        this.id = id;
        this.scope = scope;
    }
    static RegisterScope(scope, shortcode) {
        return Oid.registry.register(scope, shortcode);
    }
    static UnregisterScopes() {
        Oid.registry.resetRegistery();
    }
    static Create(scopename, id) {
        const factory = Oid.registry.getFactoryByScopename(scopename);
        const oid = factory.create(scopename, id);
        return oid;
    }
    unwrap() {
        return { id: this.id, scope: this.scope };
    }
    // Overide `Object.valueOf()` so GraphQL ID type can convert to the 'primitive' type
    valueOf() {
        return this.oid;
    }
    toString() {
        return this.oid;
    }
}
exports.Oid = Oid;
Oid.registry = scope_registry_1.scopeRegistry;
//# sourceMappingURL=oid.js.map